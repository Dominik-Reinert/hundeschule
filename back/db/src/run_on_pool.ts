import { resolve } from "path";
import { Pool, PoolClient } from "pg";

const creds = require(resolve(__dirname, "../../creds/postgresql.creds.json"));
const { user, password, database } = creds;
const dbPool = new Pool({
  user,
  password,
  database,
});

export async function getPoolClient(): Promise<PoolClient> {
  return dbPool.connect();
}

export async function createPoolTransaction(
  transactionQueries: (client: PoolClient) => Promise<void>
): Promise<void> {
  const client = await dbPool.connect();
  try {
    await client.query("BEGIN");
    await transactionQueries(client);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
