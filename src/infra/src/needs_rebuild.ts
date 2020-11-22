import { spawn, spawnSync } from "child_process";
import { readdirSync } from "fs";
import { resolve } from "path";
import { scriptsSrcPath } from "./common_path";
import { checkHashAndUpdate } from "./handle_checksums";

export function rebuildAndRestartIfNeeded(force: boolean): void {
  if (rebuildAllIfNeeded(force)) {
    console.log(`restarting process`);
    process.once("exit", () => {
      spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit",
      });
    });
    process.exit();
  }
}

function rebuildAllIfNeeded(force: boolean): boolean {
  console.log("checking hashes...");
  let restartNeeded: boolean = false;
  if (force || checkDirHash(scriptsSrcPath)) {
    console.log("Compiling...");
    spawnSync(`tsc`, ["--build", "scripts/tsconfig.json"]);
    restartNeeded = true;
  } else {
    console.log("No changes detected");
    restartNeeded = false;
  }
  return restartNeeded;
}

function checkDirHash(dir: string): boolean {
  return getFiles(dir)
    .map((file) => checkHashAndUpdate(file))
    .some((updated) => updated);
}

function getFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .map((file) => {
      const resolvedPath = resolve(dir, file.name);
      return file.isDirectory() ? getFiles(resolvedPath) : resolvedPath;
    })
    .flat();
}
