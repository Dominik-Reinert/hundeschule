import { TypeSafePostgreSqlConnection } from "ts-sql-query/connections/TypeSafePostgreSqlConnection";
import { PostgreSql } from "ts-sql-query/databases/PostgreSql";
import { TypeSafeDB } from "ts-sql-query/databases/TypeSafeDB";
import {
  InsertSets,
  RequiredInsertSets,
} from "ts-sql-query/expressions/insert";
import { SelectValues } from "ts-sql-query/expressions/select";
import { Table } from "ts-sql-query/Table";
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

export class DbTable extends Table<MyDb> {}

export type DbInsertSets<
  T extends ITableOrView<MyDb & PostgreSql>
> = InsertSets<MyDb & PostgreSql, T> & RequiredInsertSets<MyDb & PostgreSql, T>;

export type DbSelectValues<
  Table extends ITableOrView<MyDb>,
  Entity
> = SelectValues<MyDb & PostgreSql, Table, Entity>;
