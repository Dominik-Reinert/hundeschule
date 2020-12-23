import { createPoolQuery } from "../../db/src/run_on_pool";
import { Entity } from "./entity";

export interface Person {
  id: number;
  dvgId: number;
  name: string;
  vorname: string;
  addresse: string;
  email: string;
}

export interface DatabasePerson extends Omit<Person, "dvgId"> {
  dvg_id: number;
}

function adaptDatabasePerson(dbPersons: DatabasePerson[]): Person[] {
  return dbPersons.map((dbPerson) => {
    const { dvg_id, ...person } = dbPerson;
    return {
      ...person,
      dvgId: dvg_id,
    };
  });
}

function adaptPersonToDatabase(persons: Person[]): DatabasePerson[] {
  return persons.map((person) => {
    const { dvgId, ...dbPerson } = person;
    return {
      ...dbPerson,
      dvg_id: dvgId,
    };
  });
}

export class PersonEntity implements Entity<Person> {
  private readonly tableName: string = "person";

  public async findAll(): Promise<Person[]> {
    return adaptDatabasePerson(
      await createPoolQuery<DatabasePerson[]>(async (client) => {
        return (
          await client.query<DatabasePerson>(`select * from ${this.tableName};`)
        ).rows;
      })
    );
  }

  public async find(id: number): Promise<Person> {
    return adaptDatabasePerson([
      await createPoolQuery<DatabasePerson>(async (client) => {
        return (
          await client.query<DatabasePerson>(
            `select * from ${this.tableName} where id = ${id};`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async exists(id: number): Promise<boolean> {
    return createPoolQuery<boolean>(async (client) => {
      return (
        (await client.query(`select * from ${this.tableName} where id = ${id};`))
          .rowCount === 1
      );
    });
  }

  public async insert(person: Person): Promise<Person["id"]> {
    return createPoolQuery<Person["id"]>(async (client) => {
      const { id, ...idLessPerson } = adaptPersonToDatabase([person])[0];
      return (
        await client.query(
          `insert into ${
            this.tableName
          } (dvg_id, name, vorname, addresse, email) values (${Object.values(
            idLessPerson
          ).join(", ")} returning id);`
        )
      ).rows[0];
    });
  }

  public getTablename(): string {
    return this.tableName;
  }
}
