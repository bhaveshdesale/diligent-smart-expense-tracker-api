import { beforeEach } from "vitest";
import { promises as fs } from "fs";
import path from "path";

process.env.NODE_ENV = "test";

beforeEach(async () => {
  const filePath = path.resolve("tests/data/expenses.json");

  await fs.writeFile(filePath, "[]");
});