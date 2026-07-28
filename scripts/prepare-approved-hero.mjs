import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(root, ".asset-staging", "hero");
const outputPath = path.join(root, "public", "images", "approved", "hero-winged-vial.webp");
const expectedSize = 10_730;
const expectedGitBlobSha = "33fd34c8b4660938da37488d064d242fabe2e9f2";

const chunkNames = (await readdir(sourceDirectory))
  .filter((name) => name.endsWith(".b64"))
  .sort((left, right) => left.localeCompare(right, "en", { numeric: true }));

if (chunkNames.length !== 15) {
  throw new Error(`Expected 15 approved-hero chunks, found ${chunkNames.length}.`);
}

const encoded = (
  await Promise.all(chunkNames.map((name) => readFile(path.join(sourceDirectory, name), "utf8")))
).join("").replace(/\s+/g, "");

const binary = Buffer.from(encoded, "base64");
const gitHeader = Buffer.from(`blob ${binary.length}\0`, "utf8");
const gitBlobSha = createHash("sha1").update(gitHeader).update(binary).digest("hex");

if (binary.length !== expectedSize) {
  throw new Error(`Approved hero size mismatch: expected ${expectedSize}, received ${binary.length}.`);
}

if (gitBlobSha !== expectedGitBlobSha) {
  throw new Error(`Approved hero hash mismatch: expected ${expectedGitBlobSha}, received ${gitBlobSha}.`);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, binary);
console.log(`Prepared verified approved hero: ${path.relative(root, outputPath)} (${binary.length} bytes, ${gitBlobSha})`);
