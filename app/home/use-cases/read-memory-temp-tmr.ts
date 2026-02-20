import { TemperaturePoint } from "../schema";

export const ReadMemoryTempTmrUseCase = (content: string) => {
  const extractTmrSection = (text: string): string | null => {
    const startMarker = "# Temp Data";
    const endMarker = "#####Oxigen Density Data#####";

    const startIdx = text.indexOf(startMarker);
    if (startIdx === -1) {
      return null; // Section not found
    }

    const endIdx = text.indexOf(endMarker, startIdx);
    if (endIdx === -1) {
      // If end marker is missing, go to end of file
      return text.substring(startIdx);
    }

    return text.substring(startIdx, endIdx);
  };
  const parseCSV = (text: string): TemperaturePoint[] | null => {
    // Split into lines and clean
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      return null;
    }

    // Find header row (first line containing "time")
    const headerIdx = lines.findIndex((line) =>
      line.split(",").length > 0
        ? line.split(",")[0].toLowerCase().includes("time")
        : false,
    );

    if (headerIdx === -1) {
      return null; // No valid header found
    }

    const headerRow = lines[headerIdx];
    const header = headerRow
      .split(",")
      .map((h) =>
        h.trim().replace("#", "").replace("°", "").replace("degree", "°C"),
      )
      .slice(0, 7); // Fix degree symbol

    // Validate at least one column exists
    if (header.length === 0 || !header[0].toLowerCase().includes("time")) {
      return null;
    }

    const data: TemperaturePoint[] = [];
    const rowLines = lines.slice(headerIdx + 1);

    for (const line of rowLines) {
      const values = line
        .split(",")
        .map((v) => v.trim())
        .slice(0, 7);
      if (values.length === 0 || values[0] === "") continue;

      const point: Record<string, number> = {};

      for (let i = 0; i < header.length; i++) {
        const key = header[i];
        const rawValue = values[i];
        const numValue = parseFloat(rawValue);

        if (isNaN(numValue)) {
          // Optionally handle non-numeric gracefully or skip
          continue;
        }

        point[key] = numValue;
      }

      // Ensure we have at least one valid numeric value (e.g., time)
      if (Object.keys(point).length > 0) {
        data.push(point as TemperaturePoint);
      }
    }

    return data.length > 0 ? data : null;
  };
  if (content.length == 0) {
    throw new Error("Failed to read file: invalid or empty content");
  }
  const tmrSection = extractTmrSection(content);
  if (!tmrSection) {
    throw new Error(
      "Temperature data section '# Temp Data' not found in file.",
    );
  }
  const parsedData = parseCSV(content);
  if (!parsedData) {
    throw new Error(
      "Unable to parse temperature data. Missing or invalid CSV format.",
    );
  }
  return parsedData;
};
