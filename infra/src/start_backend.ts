#!/usr/bin/env node

import { spawnSync } from "child_process";
import { backendServerExecPath, backendTsConfigPath } from "./common_path";
import { rebuildAndRestartIfNeeded } from "./needs_rebuild";

(function startBackend(): void {
  console.log("checking if scripts need recompilation");
  rebuildAndRestartIfNeeded(false);

  console.log("compiling backend");
  spawnSync(`tsc --build ${backendTsConfigPath}`);

  console.log("starting server");
  spawnSync(`node ${backendServerExecPath}`);
})();
