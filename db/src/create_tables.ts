import { readFileSync } from "fs";
import { resolve } from "path";
import { createPoolTransaction } from "./run_on_pool";

export async function createTables(): Promise<void> {
  const createTableQueries: string[] = await Promise.all([
    await readFileSync(
      resolve(__dirname, "../src/create_table.person.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.landesverband.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.kreisverband.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.verein.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.kurs.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.pruefung.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.kurs_teilnehmer.sql"),
      "utf-8"
    ),
  ]);
  await createPoolTransaction(async (client) => {
    await Promise.all(createTableQueries.map((query) => client.query(query)));
  });
}
