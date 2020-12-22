import { createPoolQuery } from "../../db/src/run_on_pool";
import { AbstractEntity } from "./abstract_entity";

export interface Pruefung {
  id: number;
  kursId: number;
  prueferId: number;
  date: number;
}

interface DatabasePruefung extends Omit<Pruefung, "kursId" | "prueferId"> {
  pruefer_id: number;
  kurs_id: number;
}

function adaptDatabasePruefung(dbPruefunge: DatabasePruefung[]): Pruefung[] {
  return dbPruefunge.map((dbPruefung) => {
    const { pruefer_id, kurs_id, ...pruefung } = dbPruefung;
    return {
      ...pruefung,
      kursId: kurs_id,
      prueferId: pruefer_id,
    };
  });
}

function adaptPruefungToDatabase(pruefunge: Pruefung[]): DatabasePruefung[] {
  return pruefunge.map((pruefung) => {
    const { prueferId, kursId, ...dbPruefung } = pruefung;
    return {
      ...dbPruefung,
      kurs_id: kursId,
      pruefer_id: prueferId,
    };
  });
}

export class PruefungEntity implements AbstractEntity<Pruefung> {
  private readonly tableName: string = "Pruefung";

  public async findAll(): Promise<Pruefung[]> {
    return adaptDatabasePruefung(
      await createPoolQuery<DatabasePruefung[]>(async (client) => {
        return (
          await client.query<DatabasePruefung>(
            `select * from ${this.tableName}`
          )
        ).rows;
      })
    );
  }

  public async find(id: number): Promise<Pruefung> {
    return adaptDatabasePruefung([
      await createPoolQuery<DatabasePruefung>(async (client) => {
        return (
          await client.query<DatabasePruefung>(
            `select * from ${this.tableName} where id = ${id}`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(Pruefung: Pruefung): Promise<void> {
    return createPoolQuery<void>(async (client) => {
      const { id, ...idLessPruefung } = adaptPruefungToDatabase([Pruefung])[0];
      await client.query(
        `insert into ${this.tableName} (name) values (${Object.values(
          idLessPruefung
        ).join(", ")})`
      );
    });
  }
}
