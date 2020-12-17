import { createPoolQuery } from "../run_on_pool";
import { AbstractEntity } from "./abstract_entity";

export interface Person {
  id: string;
  dvgId: string;
  name: string;
  vorname: string;
  addresse: string;
  email: string;
}

export class PersonEntity implements AbstractEntity<Person> {
  private readonly tableName: string = "person";

  public async find(id: string): Promise<Person> {
    return createPoolQuery<Person>(async (client) => {
      return (
        await client.query<Person>(
          `select * from ${this.tableName} where id = ${id}`
        )
      ).rows[0];
    });
  }

  public async insert(person: Person): Promise<void> {
    return createPoolQuery<void>(async (client) => {
      const { id, ...idLessPerson } = person;
      await client.query(
        `insert into ${
          this.tableName
        } (dvg_id, name, vorname, addresse, email) values (${Object.values(
          idLessPerson
        ).join(", ")})`
      );
    });
  }
}
