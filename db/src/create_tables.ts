import { readFileSync } from "fs";
import { resolve } from "path";
import { createPoolTransaction } from "./run_on_pool";

export async function createTables(): Promise<void> {
  const createTableQueries: string[] = await Promise.all([
    await readFileSync(
      resolve(__dirname, "../src/create_table.01.person.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.02.landesverband.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.03.kreisverband.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.04.verein.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.05.kurs.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.06.pruefung.sql"),
      "utf-8"
    ),
    await readFileSync(
      resolve(__dirname, "../src/create_table.07.kurs_teilnehmer.sql"),
      "utf-8"
    ),
  ]);
  await createPoolTransaction(async (client) => {
    await Promise.all(createTableQueries.map((query) => client.query(query)));
  });
}
