import { asInt } from "ts-extended-types";
import { PostgreSql } from "ts-sql-query/databases/PostgreSql";
import { SelectValues } from "ts-sql-query/expressions/select";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";
import { dbPool } from "../../db/src/run_on_pool";
import { DBConnection, DbInsertSets, DbSelectValues, DbTable, MyDb } from "./db";
import {
  Person,
  PersonDto,
  PersonTable,
  personTableInstance,
} from "./person_table";

class AppUserTable extends DbTable {
  personId = this.column("person_id", "int");
  password = this.column("password", "string");
  isAdmin = this.optionalColumnWithDefaultValue("is_admin", "boolean");
  constructor() {
    super("app_user");
  }
}

export const appuserTableInstance = new AppUserTable();
export type AppUserJoined = AppUser & Person;

export interface AppUser {
  personId: number;
  password: string;
  isAdmin: boolean;
}

const selectAppUser: DbSelectValues<AppUserTable, AppUser> = {
  personId: appuserTableInstance.personId,
  password: appuserTableInstance.password,
  isAdmin: appuserTableInstance.isAdmin,
};

const selectAppUserJoined: SelectValues<
  MyDb & PostgreSql,
  AppUserTable | PersonTable,
  AppUser & Person
> = {
  id: personTableInstance.id,
  personId: personTableInstance.id,
  password: appuserTableInstance.password,
  isAdmin: appuserTableInstance.isAdmin,
  email: personTableInstance.email,
  name: personTableInstance.name,
  vorname: personTableInstance.vorname,
  adresse: personTableInstance.adresse,
  dvgId: personTableInstance.dvgId,
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

  public static findByPersonId(id: number): Promise<AppUser | null> {
    return this.getConnection()
      .selectFrom(appuserTableInstance)
      .where(appuserTableInstance.personId.equals(asInt(id)))
      .select(selectAppUser)
      .executeSelectNoneOrOne();
  }

  public static findAll(): Promise<AppUser[]> {
    return this.getConnection()
      .selectFrom(appuserTableInstance)
      .select(selectAppUser)
      .executeSelectMany();
  }

  public static findAllJoined(): Promise<(AppUser & Person)[]> {
    return this.getConnection()
      .selectFrom(appuserTableInstance)
      .innerJoin(personTableInstance)
      .on(appuserTableInstance.personId.equals(personTableInstance.id))
      .select(selectAppUserJoined)
      .executeSelectMany();
  }

  public static findByEmailJoined(
    email: string
  ): Promise<AppUserJoined | null> {
    return this.getConnection()
      .selectFrom(appuserTableInstance)
      .innerJoin(personTableInstance)
      .on(appuserTableInstance.personId.equals(personTableInstance.id))
      .where(personTableInstance.email.equals(email))
      .select(selectAppUserJoined)
      .executeSelectNoneOrOne();
  }

  public static async insert(
    appuser: AppUser,
    connection: DBConnection = this.getConnection()
  ): Promise<void> {
    await connection
      .insertInto(appuserTableInstance)
      .values(adaptAppUserToDb(appuser))
      .executeInsert();
  }

  public static async insertJoined(
    appuserJoined: Omit<AppUserJoined, "personId">
  ): Promise<void> {
    const connection = this.getConnection();
    try {
      await connection.beginTransaction();
      const personId = await PersonDto.insert(
        {
          name: appuserJoined.name,
          vorname: appuserJoined.vorname,
          email: appuserJoined.email,
          adresse: appuserJoined.adresse,
          dvgId: appuserJoined.dvgId,
        },
        connection
      );
      if (!personId) {
        throw new Error("Could not insert new person!");
      }
      await AppUserDto.insert(
        {
          personId,
          isAdmin: appuserJoined.isAdmin,
          password: appuserJoined.password,
        },
        connection
      );
      await connection.commit();
    } catch (e) {
      await connection.rollback();
      throw e;
    }
  }
}
