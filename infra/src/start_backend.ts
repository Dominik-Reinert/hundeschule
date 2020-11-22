#!/usr/bin/env node

import { spawn } from "child_process";
import { chmodSync, existsSync, fstat, fstatSync, readdirSync, unlinkSync } from "fs";
import { resolve } from "path";
import { backendDistPath, backendServerExecPath, backendTsConfigPath, typescriptCommandpath } from "./common_path";
import { rebuildAndRestartIfNeeded } from "./needs_rebuild";

async function execAndLog(command: string, options?: any): Promise<void> {
  const proc = spawn(`${command}`, options);
  proc.stdout.on("data", (data) => console.log(data.toString()));
  proc.stderr.on("data", (data) => console.error(data.toString()));
  await new Promise((res, rej) => {
    proc.once("close", res);
    proc.once("error", rej);
  });
}

(async function startBackend(): Promise<void> {
  console.log("checking if scripts need recompilation");
  rebuildAndRestartIfNeeded(false);
  
  console.log("clearing backend dist folder");
  if (existsSync(backendDistPath)) {
    readdirSync(backendDistPath).forEach(file => {
      unlinkSync(resolve(backendDistPath, file));
    })
  }

  console.log("compiling backend");
  await execAndLog(typescriptCommandpath, ['--build', backendTsConfigPath]);

  
  console.log("give execution right");
  chmodSync(resolve(backendDistPath), '755');
  chmodSync(resolve(backendDistPath, './server.js'), '755');

  console.log("starting server");
  await execAndLog('node', [backendServerExecPath]);
})();
