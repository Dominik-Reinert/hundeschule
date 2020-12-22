import { createPoolQuery } from "../../db/src/run_on_pool";
import { AbstractEntity } from "./abstract_entity";

export interface Verein {
  id: number;
  name: string;
  kreisverbandId: number;
  landesverbandId: number;
}

interface DatabaseVerein
  extends Omit<Verein, "kreisverbandId" | "landesverbandId"> {
  kreisverband_id: number;
  landesverband_id: number;
}

function adaptDatabaseVerein(dbVereine: DatabaseVerein[]): Verein[] {
  return dbVereine.map((dbVerein) => {
    const { landesverband_id, kreisverband_id, ...verein } = dbVerein;
    return {
      ...verein,
      landesverbandId: landesverband_id,
      kreisverbandId: kreisverband_id,
    };
  });
}

function adaptVereinToDatabase(vereine: Verein[]): DatabaseVerein[] {
  return vereine.map((verein) => {
    const { landesverbandId, kreisverbandId, ...dbVerein } = verein;
    return {
      ...dbVerein,
      landesverband_id: landesverbandId,
      kreisverband_id: kreisverbandId,
    };
  });
}

export class VereinEntity implements AbstractEntity<Verein> {
  private readonly tableName: string = "Verein";

  public async findAll(): Promise<Verein[]> {
    return adaptDatabaseVerein(
      await createPoolQuery<DatabaseVerein[]>(async (client) => {
        return (
          await client.query<DatabaseVerein>(`select * from ${this.tableName}`)
        ).rows;
      })
    );
  }

  public async find(id: number): Promise<Verein> {
    return adaptDatabaseVerein([
      await createPoolQuery<DatabaseVerein>(async (client) => {
        return (
          await client.query<DatabaseVerein>(
            `select * from ${this.tableName} where id = ${id}`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(Verein: Verein): Promise<void> {
    return createPoolQuery<void>(async (client) => {
      const { id, ...idLessVerein } = adaptVereinToDatabase([Verein])[0];
      await client.query(
        `insert into ${this.tableName} (name) values (${Object.values(
          idLessVerein
        ).join(", ")})`
      );
    });
  }
}
