import { createPoolQuery } from "../../db/src/run_on_pool";
import { Entity } from "./entity";

export interface KursTeilnehmer {
  id?: never;
  kursId: number;
  teilnehmerId: number;
}

interface DatabaseKursTeilnehmer
  extends Omit<KursTeilnehmer, "kursId" | "teilnehmerId"> {
  kurs_id: number;
  teilnehmer_id: number;
}

function adaptDatabaseKursTeilnehmer(
  dbKursTeilnehmere: DatabaseKursTeilnehmer[]
): KursTeilnehmer[] {
  return dbKursTeilnehmere.map((dbKursTeilnehmer) => {
    const { kurs_id, teilnehmer_id } = dbKursTeilnehmer;
    return {
      kursId: kurs_id,
      teilnehmerId: teilnehmer_id,
    };
  });
}

function adaptKursTeilnehmerToDatabase(
  kursteilnehmere: KursTeilnehmer[]
): DatabaseKursTeilnehmer[] {
  return kursteilnehmere.map((kursteilnehmer) => {
    const { kursId, teilnehmerId } = kursteilnehmer;
    return {
      kurs_id: kursId,
      teilnehmer_id: teilnehmerId,
    };
  });
}

export class KursTeilnehmerEntity implements Entity<KursTeilnehmer> {
  private readonly tableName: string = "Kurs_Teilnehmer";

  public async findAll(): Promise<KursTeilnehmer[]> {
    return adaptDatabaseKursTeilnehmer(
      await createPoolQuery<DatabaseKursTeilnehmer[]>(async (client) => {
        return (
          await client.query<DatabaseKursTeilnehmer>(
            `select * from ${this.tableName}`
          )
        ).rows;
      })
    );
  }

  public async find(id: number): Promise<KursTeilnehmer> {
    return adaptDatabaseKursTeilnehmer([
      await createPoolQuery<DatabaseKursTeilnehmer>(async (client) => {
        return (
          await client.query<DatabaseKursTeilnehmer>(
            `select * from ${this.tableName} where id = ${id}`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(KursTeilnehmer: KursTeilnehmer): Promise<undefined> {
    /*  return createPoolQuery<void>(async (client) => {
      const { id, ...idLessKursTeilnehmer } = adaptKursTeilnehmerToDatabase([KursTeilnehmer])[0];
      await client.query(
        `insert into ${this.tableName} (name) values (${Object.values(
          idLessKursTeilnehmer
        ).join(", ")})`
      );
    }); */
    return ;
  }

  public getTablename(): string {
    return this.tableName
  }
}
