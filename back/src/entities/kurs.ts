import { createPoolQuery } from "../../db/src/run_on_pool";
import { AbstractEntity } from "./abstract_entity";

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

export class KursEntity implements AbstractEntity<Kurs> {
  private readonly tableName: string = "Kurs";

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

  public async insert(Kurs: Kurs): Promise<void> {
    return createPoolQuery<void>(async (client) => {
      const { id, ...idLessKurs } = adaptKursToDatabase([Kurs])[0];
      await client.query(
        `insert into ${this.tableName} (name) values (${Object.values(
          idLessKurs
        ).join(", ")})`
      );
    });
  }
}
