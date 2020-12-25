import { asInt } from "ts-extended-types";
import { PostgreSql } from "ts-sql-query/databases/PostgreSql";
import { SelectValues } from "ts-sql-query/expressions/select";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";
import { Table } from "ts-sql-query/Table";
import { dbPool } from "../../db/src/run_on_pool";
import { DBConnection, DbInsertSets, MyDb } from "./db";

class AppUserTable extends Table<MyDb> {
  personId = this.column("person_id", "int");
  password = this.column("password", "string");
  isAdmin = this.optionalColumnWithDefaultValue("is_admin", "boolean");
  constructor() {
    super("app_user");
  }
}

const appuserTableInstance = new AppUserTable();

export interface AppUser {
  personId: number;
  password: string;
  isAdmin: boolean;
}

const selectAppUser: SelectValues<MyDb & PostgreSql, AppUserTable, AppUser> = {
  personId: appuserTableInstance.personId,
  password: appuserTableInstance.password,
  isAdmin: appuserTableInstance.isAdmin,
};

function adaptAppUserToDb(appuser: AppUser): DbInsertSets<AppUserTable> {
  return {
    personId: asInt(appuser.personId),
    password: appuser.password,
    isAdmin: appuser.isAdmin,
  };
}

export class AppUserDto {
  private static getConnection(): DBConnection {
    return new DBConnection(new PgPoolQueryRunner(dbPool));
  }

  public static findByPersonId(id: number): Promise<AppUser> {
    return this.getConnection()
      .selectFrom(appuserTableInstance)
      .where(appuserTableInstance.personId.equals(asInt(id)))
      .select(selectAppUser)
      .executeSelectOne();
  }

  public static findAll(): Promise<AppUser[]> {
    return this.getConnection()
      .selectFrom(appuserTableInstance)
      .select(selectAppUser)
      .executeSelectMany();
  }

  public static async insert(appuser: AppUser): Promise<void> {
    await this.getConnection()
      .insertInto(appuserTableInstance)
      .values(adaptAppUserToDb(appuser))
      .executeInsert();
  }
}
