import { spawn } from "child_process";
import { exit } from "process";


export async function execAndLog(command: string, options?: any): Promise<void> {
  const proc = spawn(`${command}`, options);
  proc.stdout.on("data", (data) => console.log(data.toString()));
  proc.stderr.on("data", (data) => console.error(data.toString()));
  await new Promise((res) => {
    proc.once("close", res);
    proc.once("error", () => {
        exit(1)
    });
  });
}
