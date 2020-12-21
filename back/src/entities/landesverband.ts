import { createPoolQuery } from "../../db/src/run_on_pool";
import { AbstractEntity } from "./abstract_entity";

export interface Landesverband {
  id: string;
  name: string;
}

interface DatabaseLandesverband extends Landesverband {}

function adaptDatabaseLandesverband(
  dbLandesverbands: DatabaseLandesverband[]
): Landesverband[] {
  return dbLandesverbands;
}

function adaptLandesverbandToDatabase(
  dbLandesverbands: Landesverband[]
): DatabaseLandesverband[] {
  return dbLandesverbands;
}

export class LandesverbandEntity implements AbstractEntity<Landesverband> {
  private readonly tableName: string = "Landesverband";

  public async findAll(): Promise<Landesverband[]> {
    return adaptDatabaseLandesverband(
      await createPoolQuery<DatabaseLandesverband[]>(async (client) => {
        return (
          await client.query<DatabaseLandesverband>(
            `select * from ${this.tableName}`
          )
        ).rows;
      })
    );
  }

  public async find(id: string): Promise<Landesverband> {
    return adaptDatabaseLandesverband([
      await createPoolQuery<DatabaseLandesverband>(async (client) => {
        return (
          await client.query<DatabaseLandesverband>(
            `select * from ${this.tableName} where id = ${id}`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(Landesverband: Landesverband): Promise<void> {
    return createPoolQuery<void>(async (client) => {
      const { id, ...idLessLandesverband } = adaptLandesverbandToDatabase([
        Landesverband,
      ])[0];
      await client.query(
        `insert into ${this.tableName} (name) values (${Object.values(
          idLessLandesverband
        ).join(", ")})`
      );
    });
  }
}
