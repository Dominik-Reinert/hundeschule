import { Client } from "pg";
const creds = require("../creds/postgresql.creds.json");

export async function createDbPg(): Promise<void> {
  const { user, password, database } = creds;
  const client = new Client({
    user,
    password,
    database,
  });
  client.connect();
  client
    .query("create database hundeschule;")
    .then(() => console.info("worked!"))
    .catch((e) => console.error(e));
}
