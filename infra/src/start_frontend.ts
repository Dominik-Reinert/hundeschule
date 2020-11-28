#!/usr/bin/env node

import { existsSync, lstatSync, readdirSync, unlinkSync } from "fs";
import { basename, resolve } from "path";
import { execAndLog } from "./exect_and_log";
import { rebuildAndRestartIfNeeded } from "./needs_rebuild";

function deleteFolderRecursive(folderName: string): void {
  if (existsSync(folderName)) {
    readdirSync(folderName).forEach((file) => {
      const filePath: string = resolve(folderName, file);
      if (basename(filePath) !== "index.html") {
        if (lstatSync(filePath).isDirectory()) {
          deleteFolderRecursive(filePath);
        } else {
          unlinkSync(filePath);
        }
      }
    });
  }
}

(async function startFrontend(): Promise<void> {
  console.log("checking if scripts need recompilation");
  rebuildAndRestartIfNeeded(false);

  console.log("starting server");
  await execAndLog("yarn", ["webpack-dev-server"]);
})();
