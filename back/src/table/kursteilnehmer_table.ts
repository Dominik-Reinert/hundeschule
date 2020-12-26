import { asInt } from "ts-extended-types";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";
import { dbPool } from "../../db/src/run_on_pool";
import { DBConnection, DbInsertSets, DbSelectValues, DbTable } from "./db";

class KursteilnehmerTable extends DbTable {
  kursId = this.column("kurs_id", "int");
  teilnehmerId = this.column("teilnehmer_id", "int");
  constructor() {
    super("kurs_teilnehmer");
  }
}

export const kursteilnehmerTableInstance = new KursteilnehmerTable();

export interface Kursteilnehmer {
  kursId: number;
  teilnehmerId: number;
}

const selectKursteilnehmer: DbSelectValues<
  KursteilnehmerTable,
  Kursteilnehmer
> = {
  kursId: kursteilnehmerTableInstance.kursId,
  teilnehmerId: kursteilnehmerTableInstance.teilnehmerId,
};

function adaptKursteilnehmerToDb(
  kursteilnehmer: Kursteilnehmer
): DbInsertSets<KursteilnehmerTable> {
  return {
    kursId: asInt(kursteilnehmer.kursId),
    teilnehmerId: asInt(kursteilnehmer.teilnehmerId),
  };
}

export class KursteilnehmerDto {
  private static getConnection(): DBConnection {
    return new DBConnection(new PgPoolQueryRunner(dbPool));
  }

  public static findById(
    options: { teilnehmerId: number },
    connection: DBConnection
  ): Promise<Kursteilnehmer>;
  public static findById(
    options: { kursId: number },
    connection: DBConnection
  ): Promise<Kursteilnehmer>;
  public static findById(
    options: { kursId: number; teilnehmerId: number },
    connection: DBConnection = this.getConnection()
  ): Promise<Kursteilnehmer | null> {
    const { kursId, teilnehmerId } = options;
    if (kursId && teilnehmerId) {
      return connection
        .selectFrom(kursteilnehmerTableInstance)
        .where(
          kursteilnehmerTableInstance.kursId
            .equals(asInt(kursId))
            .and(
              kursteilnehmerTableInstance.teilnehmerId.equals(
                asInt(teilnehmerId)
              )
            )
        )
        .select(selectKursteilnehmer)
        .executeSelectNoneOrOne();
    } else if (kursId) {
      return connection
        .selectFrom(kursteilnehmerTableInstance)
        .where(kursteilnehmerTableInstance.kursId.equals(asInt(kursId)))
        .select(selectKursteilnehmer)
        .executeSelectNoneOrOne();
    } else {
      return connection
        .selectFrom(kursteilnehmerTableInstance)
        .where(
          kursteilnehmerTableInstance.teilnehmerId.equals(asInt(teilnehmerId))
        )
        .select(selectKursteilnehmer)
        .executeSelectNoneOrOne();
    }
  }

  public static findAll(): Promise<Kursteilnehmer[]> {
    return this.getConnection()
      .selectFrom(kursteilnehmerTableInstance)
      .select(selectKursteilnehmer)
      .executeSelectMany();
  }

  public static async insert(kursteilnehmer: Kursteilnehmer): Promise<void> {
    await this.getConnection()
      .insertInto(kursteilnehmerTableInstance)
      .values(adaptKursteilnehmerToDb(kursteilnehmer))
      .executeInsert();
  }
}
