import { asInt, LocalDate } from "ts-extended-types";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";
import { dbPool } from "../../db/src/run_on_pool";
import { DBConnection, DbInsertSets, DbSelectValues, DbTable } from "./db";

class KursTable extends DbTable {
  id = this.autogeneratedPrimaryKey("id", "int");
  leiterId = this.column("leiter_id", "int");
  beginn = this.column("beginn", "localDate");
  constructor() {
    super("kurs");
  }
}

export const kursTableInstance = new KursTable();

export interface Kurs {
  id: number;
  leiterId: number;
  beginn: LocalDate;
}

const selectKurs: DbSelectValues<KursTable, Kurs> = {
  id: kursTableInstance.id,
  leiterId: kursTableInstance.leiterId,
  beginn: kursTableInstance.beginn,
};

function adaptKursToDb(kurs: Kurs): DbInsertSets<KursTable> {
  return {
    id: asInt(kurs.id),
    leiterId: asInt(kurs.leiterId),
    beginn: kurs.beginn,
  };
}

export class KursDto {
  private static getConnection(): DBConnection {
    return new DBConnection(new PgPoolQueryRunner(dbPool));
  }

  public static findById(id: number): Promise<Kurs> {
    return this.getConnection()
      .selectFrom(kursTableInstance)
      .where(kursTableInstance.id.equals(asInt(id)))
      .select(selectKurs)
      .executeSelectOne();
  }

  public static findAll(): Promise<Kurs[]> {
    return this.getConnection()
      .selectFrom(kursTableInstance)
      .select(selectKurs)
      .executeSelectMany();
  }

  public static insert(kurs: Kurs): Promise<Kurs["id"]> {
    return this.getConnection()
      .insertInto(kursTableInstance)
      .values(adaptKursToDb(kurs))
      .returningLastInsertedId()
      .executeInsert();
  }
}