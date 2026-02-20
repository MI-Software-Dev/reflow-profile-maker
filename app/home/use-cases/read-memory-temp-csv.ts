import { TemperaturePoint } from "../schema";

export const ReadMemoryTempCsvUseCase = (
  content: string,
): TemperaturePoint[] => {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0); // Remove empty/whitespace lines

  if (lines.length === 0) {
    throw new Error("CSV file is empty.");
  }

  // Find header row with "time" in the first column
  const headerIdx = lines.findIndex((line) => {
    const firstCell = line.split(",")[0]?.trim().toLowerCase();
    return firstCell?.includes("time");
  });

  if (headerIdx === -1) {
    throw new Error(
      'No valid header found containing "time" in the first column.',
    );
  }

  const headerRow = lines[headerIdx];
  const header = headerRow.split(",").map((h) => h.trim().replace("�", "°")); // Fix encoding artifact

  if (header.length === 0 || !header[0].toLowerCase().includes("time")) {
    throw new Error(
      "Invalid CSV format: First column of header must contain 'time'.",
    );
  }

  const data: TemperaturePoint[] = [];

  // Process data rows
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(",").map((v) => v.trim());

    if (values.length === 0 || values[0] === "") continue; // Skip empty rows

    const record: Record<string, number> = {};

    for (let j = 0; j < header.length; j++) {
      const key = header[j];
      const rawValue = values[j];

      // Skip if value is missing
      if (rawValue === undefined || rawValue === "") {
        continue;
      }

      const numValue = parseFloat(rawValue);
      if (isNaN(numValue)) {
        // Optionally: skip non-numeric values instead of failing
        console.warn(`Non-numeric value skipped for ${key}: ${rawValue}`);
        continue;
      }

      record[key] = numValue;
    }

    // Only add if we have at least one valid field (e.g. time)
    if (Object.keys(record).length > 0) {
      data.push(record as TemperaturePoint);
    }
  }

  if (data.length === 0) {
    throw new Error("No valid temperature data found in the CSV.");
  }
  return data;
};
