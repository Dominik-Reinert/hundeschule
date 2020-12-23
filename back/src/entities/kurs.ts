import { createPoolQuery } from "../../db/src/run_on_pool";
import { Entity } from "./entity";

export interface Kurs {
  id: number;
  leiterId: number;
  beginn: number;
}

interface DatabaseKurs extends Omit<Kurs, "leiterId"> {
  leiter_id: number;
}

function adaptDatabaseKurs(dbKurse: DatabaseKurs[]): Kurs[] {
  return dbKurse.map((dbKurs) => {
    const { leiter_id, ...kurs } = dbKurs;
    return {
      ...kurs,
      leiterId: leiter_id,
    };
  });
}

function adaptKursToDatabase(kurse: Kurs[]): DatabaseKurs[] {
  return kurse.map((kurs) => {
    const { leiterId, ...dbKurs } = kurs;
    return {
      ...dbKurs,
      leiter_id: leiterId,
    };
  });
}

export class KursEntity implements Entity<Kurs> {
  private readonly tableName: string = "kurs";

  public async findAll(): Promise<Kurs[]> {
    return adaptDatabaseKurs(
      await createPoolQuery<DatabaseKurs[]>(async (client) => {
        return (
          await client.query<DatabaseKurs>(`select * from ${this.tableName}`)
        ).rows;
      })
    );
  }

  public async find(id: number): Promise<Kurs> {
    return adaptDatabaseKurs([
      await createPoolQuery<DatabaseKurs>(async (client) => {
        return (
          await client.query<DatabaseKurs>(
            `select * from ${this.tableName} where id = ${id}`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(Kurs: Kurs): Promise<number> {
    return createPoolQuery<number>(async (client) => {
      const { id, ...idLessKurs } = adaptKursToDatabase([Kurs])[0];
      return (
        await client.query(
          `insert into ${this.tableName} (name) values (${Object.values(
            idLessKurs
          ).join(", ")}) returning id;`
        )
      ).rows[0];
    });
  }

  public getTablename(): string {
    return this.tableName;
  }
}
