import { Response } from "express";
import { Person, PersonDto } from "../table/person_table";

export async function sendAllPerson(res: Response<any>): Promise<any> {
  const allPerson: Person[] = await PersonDto.findAll();
  console.info(`Found person(s) in database: ${JSON.stringify(allPerson)}`);
  res.render("all_person", {
    data: {
      person: allPerson,
    },
  });
}
