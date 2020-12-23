import { createPoolQuery } from "../../db/src/run_on_pool";
import { Entity } from "./entity";

export interface Landesverband {
  id: number;
  name: string;
}

interface DatabaseLandesverband extends Landesverband {}

function adaptDatabaseLandesverband(
  dbLandesverbande: DatabaseLandesverband[]
): Landesverband[] {
  return dbLandesverbande;
}

function adaptLandesverbandToDatabase(
  landesverbande: Landesverband[]
): DatabaseLandesverband[] {
  return landesverbande;
}

export class LandesverbandEntity implements Entity<Landesverband> {
  private readonly tableName: string = "landesverband";

  public async findAll(): Promise<Landesverband[]> {
    return adaptDatabaseLandesverband(
      await createPoolQuery<DatabaseLandesverband[]>(async (client) => {
        return (
          await client.query<DatabaseLandesverband>(
            `select * from ${this.tableName};`
          )
        ).rows;
      })
    );
  }

  public async find(id: number): Promise<Landesverband> {
    return adaptDatabaseLandesverband([
      await createPoolQuery<DatabaseLandesverband>(async (client) => {
        return (
          await client.query<DatabaseLandesverband>(
            `select * from ${this.tableName} where id = ${id};`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(Landesverband: Landesverband): Promise<number> {
    return createPoolQuery<number>(async (client) => {
      const { id, ...idLessLandesverband } = adaptLandesverbandToDatabase([
        Landesverband,
      ])[0];
      return (
        await client.query(
          `insert into ${this.tableName} (name) values (${Object.values(
            idLessLandesverband
          ).join(", ")}) returning id;`
        )
      ).rows[0];
    });
  }

  public getTablename(): string {
    return this.tableName;
  }
}
