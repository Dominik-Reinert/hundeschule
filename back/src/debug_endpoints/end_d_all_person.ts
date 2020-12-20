import { Response } from "express";
import { Person, PersonEntity } from "../entities/person";

export async function sendAllPerson(res: Response<any>): Promise<any> {
  const allPerson: Person[] = await new PersonEntity().findAll();
  console.info(`Found person(s) in database: ${JSON.stringify(allPerson)}`);
  res.render("all_person", {
    data: {
      person: allPerson,
    },
  });
}
