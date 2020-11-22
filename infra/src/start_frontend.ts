#!/usr/bin/env node

import { chmodSync, existsSync, readdirSync, unlinkSync } from "fs";
import { basename, resolve } from "path";
import {
  frontendDistPath,
  frontendServerConfigPath,
  frontendTsConfigPath,
  typescriptCommandpath,
} from "./common_path";
import { execAndLog } from "./exect_and_log";
import { rebuildAndRestartIfNeeded } from "./needs_rebuild";

(async function startFrontend(): Promise<void> {
  console.log("checking if scripts need recompilation");
  rebuildAndRestartIfNeeded(false);

  console.log("clearing frontend dist folder");
  if (existsSync(frontendDistPath)) {
    readdirSync(frontendDistPath).forEach((file) => {
      if (basename(file) !== "index.html") {
        unlinkSync(resolve(frontendDistPath, file));
      }
    });
  }

  console.log("compiling frontend");
  await execAndLog(typescriptCommandpath, ["--build", frontendTsConfigPath]);

  console.log("give execution right");
  chmodSync(resolve(frontendDistPath), "755");

  console.log("starting server");
  await execAndLog("webpack-dev-server", [
    "--mode",
    "development",
    "--open",
    "--hot",
    "--config",
    frontendServerConfigPath,
  ]);
})();
