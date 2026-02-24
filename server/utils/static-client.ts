import fs from "fs";
import path from "path";
import process from "process";

// process.cwd() points to 'D:\Project\reflow-profile-v2\'
// assuming that is where you start your server.
const STATIC_DIR = path.join(process.cwd(), "server", "static");

const fileMap = {
  group: "group-config.json",
  line: "line-config.json",
  n2: "n2-config.json",
  nas: "nas-config.json",
  gateway: "gateway-config.json",
  db: "db-config.json",
};

function getFilePath(name: keyof typeof fileMap) {
  const file = fileMap[name];
  if (!file) {
    throw new Error(`Static file ${name} not found`);
  }
  return path.join(STATIC_DIR, file);
}

export const staticClient = {
  readStatic(name: keyof typeof fileMap) {
    const filePath = getFilePath(name);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  },

  updateStatic(name: keyof typeof fileMap, data: object) {
    const filePath = getFilePath(name);

    // read existing
    const current = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // merge
    const updated = {
      ...current,
      ...data,
    };

    // write back to file
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");

    return updated;
  },
};
