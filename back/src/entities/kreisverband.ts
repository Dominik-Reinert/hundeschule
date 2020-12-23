import { createPoolQuery } from "../../db/src/run_on_pool";
import { Entity } from "./entity";

export interface Kreisverband {
  id: number;
  name: string;
  landesverbandId: number;
}

interface DatabaseKreisverband extends Omit<Kreisverband, "landesverbandId"> {
  landesverband_id: number;
}

function adaptDatabaseKreisverband(
  dbKreisverbande: DatabaseKreisverband[]
): Kreisverband[] {
  return dbKreisverbande.map((dbKreisverband) => {
    const { landesverband_id, ...kreisverband } = dbKreisverband;
    return {
      ...kreisverband,
      landesverbandId: landesverband_id,
    };
  });
}

function adaptKreisverbandToDatabase(
  kreisverbande: Kreisverband[]
): DatabaseKreisverband[] {
  return kreisverbande.map((kreisverband) => {
    const { landesverbandId, ...dbKreisverband } = kreisverband;
    return {
      ...dbKreisverband,
      landesverband_id: landesverbandId,
    };
  });
}

export class KreisverbandEntity implements Entity<Kreisverband> {
  private readonly tableName: string = "kreisverband";

  public async findAll(): Promise<Kreisverband[]> {
    return adaptDatabaseKreisverband(
      await createPoolQuery<DatabaseKreisverband[]>(async (client) => {
        return (
          await client.query<DatabaseKreisverband>(
            `select * from ${this.tableName}`
          )
        ).rows;
      })
    );
  }

  public async find(id: number): Promise<Kreisverband> {
    return adaptDatabaseKreisverband([
      await createPoolQuery<DatabaseKreisverband>(async (client) => {
        return (
          await client.query<DatabaseKreisverband>(
            `select * from ${this.tableName} where id = ${id}`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(Kreisverband: Kreisverband): Promise<number> {
    return createPoolQuery<number>(async (client) => {
      const { id, ...idLessKreisverband } = adaptKreisverbandToDatabase([
        Kreisverband,
      ])[0];
      return (
        await client.query(
          `insert into ${this.tableName} (name) values (${Object.values(
            idLessKreisverband
          ).join(", ")}) returning id`
        )
      ).rows[0];
    });
  }

  public getTablename(): string {
    return this.tableName;
  }
}
