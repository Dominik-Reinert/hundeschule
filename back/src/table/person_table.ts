import { asInt } from "ts-extended-types";
import { PostgreSql } from "ts-sql-query/databases/PostgreSql";
import { SelectValues } from "ts-sql-query/expressions/select";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";
import { Table } from "ts-sql-query/Table";
import { dbPool } from "../../db/src/run_on_pool";
import { DBConnection, DbInsertSets, MyDb } from "./db";

class PersonTable extends Table<MyDb> {
  id = this.autogeneratedPrimaryKey("id", "int");
  vorname = this.column("vorname", "string");
  name = this.column("name", "string");
  email = this.column("email", "string");
  adresse = this.optionalColumn("adresse", "string");
  dvgId = this.optionalColumn("dvg_id", "int");
  constructor() {
    super("person");
  }
}

const personTableInstance = new PersonTable();

export interface Person {
  id: number;
  vorname: string;
  name: string;
  email: string;
  dvgId?: number | undefined | null;
  adresse?: string | undefined | null;
}

const selectPerson: SelectValues<MyDb & PostgreSql, PersonTable, Person> = {
  id: personTableInstance.id,
  vorname: personTableInstance.vorname,
  name: personTableInstance.name,
  email: personTableInstance.email,
  dvgId: personTableInstance.dvgId,
  adresse: personTableInstance.adresse,
};

function adaptPersonToDb(person: Person): DbInsertSets<PersonTable> {
  return {
    id: asInt(person.id),
    name: person.name,
    vorname: person.vorname,
    adresse: person.adresse,
    email: person.email,
    dvgId: person.dvgId ? asInt(person.dvgId) : undefined,
  };
}

export class PersonDto {
  private static getConnection(): DBConnection {
    return new DBConnection(new PgPoolQueryRunner(dbPool));
  }

  public static findById(id: number): Promise<Person> {
    return this.getConnection()
      .selectFrom(personTableInstance)
      .where(personTableInstance.id.equals(asInt(id)))
      .select(selectPerson)
      .executeSelectOne();
  }

  public static findAll(): Promise<Person[]> {
    return this.getConnection()
      .selectFrom(personTableInstance)
      .select(selectPerson)
      .executeSelectMany();
  }

  public static insert(person: Person): Promise<Person["id"]> {
    return this.getConnection()
      .insertInto(personTableInstance)
      .values(adaptPersonToDb(person))
      .returningLastInsertedId()
      .executeInsert();
  }
}
