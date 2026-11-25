import { join, dirname } from "node:path";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const PITCH = "We sell pre-signed 'LGTM' GitHub review comments for $0.001 each so lazy AI agents approve PRs they never read.";

function writeOutput(outputDir: string): string {
  const outputPath = join(outputDir, "entry.txt");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, PITCH, "utf8");
  return outputPath;
}

function verifyOutput(outputPath: string): void {
  const written = readFileSync(outputPath, "utf8");
  if (written !== PITCH) {
    throw new Error("Output mismatch: written content differs from constant");
  }
  console.error(`[self-check] wrote ${written.length} characters, SHA256: ${createHash("sha256").update(written).digest("hex")}`);
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = writeOutput(outputDir);
  verifyOutput(outputPath);
}

main();