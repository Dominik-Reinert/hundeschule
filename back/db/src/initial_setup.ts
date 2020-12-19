import { spawnSync } from "child_process";

export async function initialSetup(user: string, passwd: string): Promise<void> {
  await spawnSync(
    `sudo -u postgres psql -c 'create database if not exist hundeschule;'`
  );
  await spawnSync(
    `sudo -u postgres psql -c 'create user if not exist ${user} with encrypted password "${passwd}";'`
  );
  await spawnSync(
    `sudo -u postgres psql -c 'grant all privileges on database test to ${user};`
  );
}
