import { createHash } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { pathToFileURL } from "url";
import { scriptsDistPath } from "./common_path";

export function checkHashAndUpdate(filePath: string): boolean {
  const hashFile = `${scriptsDistPath}/hashes.json`;
  const hashContent: string = existsSync(hashFile)
    ? readFileSync(pathToFileURL(hashFile), "utf-8")
    : "{}";
  const parsedHashes: { [key: string]: string } = JSON.parse(hashContent);
  const fileContent: string = readFileSync(pathToFileURL(filePath), "utf-8");
  const fileHash: string = createCheckSum(fileContent);
  const oldHash: string = parsedHashes[filePath];

  if (oldHash !== fileHash) {
    const newHashes: { [key: string]: string } = {
      ...parsedHashes,
      [filePath]: fileHash,
    };
    writeFileSync(pathToFileURL(hashFile), JSON.stringify(newHashes), {
      encoding: "utf-8",
    });
    return true;
  }
  return false;
}

function createCheckSum(input: string): string {
  return createHash("md5").update(input).digest("hex");
}
