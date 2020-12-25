import { PostgreSql } from "ts-sql-query/databases/PostgreSql";
import { SelectValues } from "ts-sql-query/expressions/select";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";
import { Table } from "ts-sql-query/Table";
import { dbPool } from "../../db/src/run_on_pool";
import { DBConnection, MyDb } from "./db";

class VereinTable extends Table<MyDb> {
  id = this.autogeneratedPrimaryKey("id", "int");
  name = this.column("name", "string");
  kreisverbandId = this.column("kreisverband_id", "int")
  vorsitzenderId = this.column("vorsitzender_id", "int")
  constructor() {
    super("verein");
  }
}

const vereinTableInstance = new VereinTable();

export interface Verein {
  id: number;
  name: string;
  kreisverbandId: number;
  vorsitzenderId: number;
}

const selectVerein: SelectValues<
  MyDb & PostgreSql,
  VereinTable,
  Verein
> = {
  id: vereinTableInstance.id,
  name: vereinTableInstance.name,
  kreisverbandId: vereinTableInstance.kreisverbandId,
  vorsitzenderId: vereinTableInstance.vorsitzenderId
};

export class VereinDto {
  private static getConnection(): DBConnection {
    return new DBConnection(new PgPoolQueryRunner(dbPool));
  }

  public static findById(id: number): Promise<Verein> {
    return this.getConnection()
      .selectFrom(vereinTableInstance)
      .where(vereinTableInstance.id.equals(id))
      .select(selectVerein)
      .executeSelectOne();
  }

  public static findAll(): Promise<Verein[]> {
    return this.getConnection()
      .selectFrom(vereinTableInstance)
      .select(selectVerein)
      .executeSelectMany();
  }

  public static insert(
    verein: Verein
  ): Promise<Verein["id"]> {
    return this.getConnection()
      .insertInto(vereinTableInstance)
      .values(verein)
      .returningLastInsertedId()
      .executeInsert();
  }
}
