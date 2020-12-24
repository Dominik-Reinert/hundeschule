import { PostgreSqlConnection } from "ts-sql-query/connections/PostgreSqlConnection";
import { PostgreSql } from "ts-sql-query/databases/PostgreSql";
import { TypeUnsafeDB } from "ts-sql-query/databases/TypeUnsafeDB";

export class MyDb implements PostgreSql, TypeUnsafeDB {
  public __PostgreSql: "PostgreSql" = "PostgreSql";
  public __AnyDB: "AnyDB" = "AnyDB";
  public __TypeUnsafe: "TypeUnsafe" = "TypeUnsafe";
}

export class DBConnection extends PostgreSqlConnection<MyDb, "hundeschule"> {}
