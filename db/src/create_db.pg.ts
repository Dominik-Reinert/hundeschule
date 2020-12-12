import { Client } from "pg";
const creds = require('../creds/postgresql.creds.json');

export async function createDbPg(): Promise<void> {
  const { user, password } = creds;
  const client = new Client({
    user,
    password,
    database: "hundeschule",
  });
  client.connect();
  client
    .query("create database hundeschule;")
    .then(() => console.info("worked!"))
    .catch((e) => console.error(e));
}
