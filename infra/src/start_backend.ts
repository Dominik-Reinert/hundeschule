#!/usr/bin/env node

import { spawn } from "child_process";
import { chmodSync, existsSync, readdirSync, unlinkSync } from "fs";
import { basename, resolve } from "path";
import {
  backendDistPath,
  backendServerExecPath,
  backendTsConfigPath,
  typescriptCommandpath,
} from "./common_path";
import { execAndLog } from "./exect_and_log";
import { rebuildAndRestartIfNeeded } from "./needs_rebuild";

(async function startBackend(): Promise<void> {
  console.log("checking if scripts need recompilation");
  rebuildAndRestartIfNeeded(false);

  console.log("clearing backend dist folder");
  if (existsSync(backendDistPath)) {
    readdirSync(backendDistPath).forEach((file) => {
      if (basename(file) !== "index.html") {
        unlinkSync(resolve(backendDistPath, file));
      }
    });
  }

  console.log("compiling backend");
  await execAndLog(typescriptCommandpath, ["--build", backendTsConfigPath]);

  console.log("give execution right");
  chmodSync(resolve(backendDistPath), "755");
  chmodSync(resolve(backendDistPath, "./server.js"), "755");

  console.log("starting server");
  await execAndLog("node", [backendServerExecPath]);
})();
