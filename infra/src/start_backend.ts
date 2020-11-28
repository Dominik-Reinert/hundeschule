#!/usr/bin/env node

import { chmodSync, existsSync, readdirSync, unlinkSync } from "fs";
import { basename, resolve } from "path";
import {
  backendDistPath,

  backendSrcPath,

  nodemonCommandpath
} from "./common_path";
import { execAndLog } from "./exect_and_log";
import { rebuildAndRestartIfNeeded } from "./needs_rebuild";

(async function startBackend(): Promise<void> {
 /* console.log("checking if scripts need recompilation");
  rebuildAndRestartIfNeeded(false);

  console.log("clearing backend dist folder");
  if (existsSync(backendDistPath)) {
    readdirSync(backendDistPath).forEach((file) => {
      if (basename(file) !== "index.html") {
        unlinkSync(resolve(backendDistPath, file));
      }
    });
  }

  console.log("granting execution permission to server.ts");
  chmodSync(resolve(backendSrcPath, './server.ts'), '755');

  console.log("starting backend server");
  await execAndLog(`cd back; ${nodemonCommandpath}`);
*/})();
