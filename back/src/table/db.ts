import { TypeSafePostgreSqlConnection } from "ts-sql-query/connections/TypeSafePostgreSqlConnection";
import { PostgreSql } from "ts-sql-query/databases/PostgreSql";
import { TypeSafeDB } from "ts-sql-query/databases/TypeSafeDB";
import {
  InsertSets,
  RequiredInsertSets,
} from "ts-sql-query/expressions/insert";
import { ITableOrView } from "ts-sql-query/utils/ITableOrView";

export class MyDb implements PostgreSql, TypeSafeDB {
  public __PostgreSql: "PostgreSql" = "PostgreSql";
  public __AnyDB: "AnyDB" = "AnyDB";
  public __TypeSafe: "TypeSafe" = "TypeSafe";
}

export class DBConnection extends TypeSafePostgreSqlConnection<
  MyDb,
  "hundeschule"
> {}

export type DbInsertSets<
  T extends ITableOrView<MyDb & PostgreSql>
> = InsertSets<MyDb & PostgreSql, T> & RequiredInsertSets<MyDb & PostgreSql, T>;
