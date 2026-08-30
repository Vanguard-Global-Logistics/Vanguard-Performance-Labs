import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "public", "images", "approved", "hero-winged-vial.webp");
const expectedSize = 18_340;
const expectedGitBlobSha = "c7c8114885f83bcb0216ea481e32875eee4de270";
const expectedWidth = 701;
const expectedHeight = 320;

const partPaths = [1, 2, 3, 4].map((part) =>
  path.join(root, "lib", `approved-hero-q50-part-${part}.ts`),
);

const encodedParts = await Promise.all(
  partPaths.map(async (partPath, index) => {
    const source = await readFile(partPath, "utf8");
    const match = source.match(/= "([A-Za-z0-9+/=]+)";\s*$/);

    if (!match) {
      throw new Error(`Could not read approved-hero source part ${index + 1}.`);
    }

    return match[1];
  }),
);

const encoded = encodedParts.join("");

const binary = Buffer.from(encoded, "base64");
const gitHeader = Buffer.from(`blob ${binary.length}\0`, "utf8");
const gitBlobSha = createHash("sha1").update(gitHeader).update(binary).digest("hex");

if (binary.length !== expectedSize) {
  throw new Error(`Approved hero size mismatch: expected ${expectedSize}, received ${binary.length}.`);
}

if (gitBlobSha !== expectedGitBlobSha) {
  throw new Error(`Approved hero hash mismatch: expected ${expectedGitBlobSha}, received ${gitBlobSha}.`);
}

if (
  binary.toString("ascii", 0, 4) !== "RIFF" ||
  binary.toString("ascii", 8, 12) !== "WEBP"
) {
  throw new Error("Approved hero is not a valid RIFF/WEBP container.");
}

const width = binary.readUInt16LE(26) & 0x3fff;
const height = binary.readUInt16LE(28) & 0x3fff;

if (width !== expectedWidth || height !== expectedHeight) {
  throw new Error(
    `Approved hero dimensions mismatch: expected ${expectedWidth}x${expectedHeight}, received ${width}x${height}.`,
  );
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, binary);
console.log(
  `Prepared verified approved hero: ${path.relative(root, outputPath)} (${width}x${height}, ${binary.length} bytes, ${gitBlobSha})`,
);
