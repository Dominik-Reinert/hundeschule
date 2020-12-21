import { Response } from "express";
import { Kreisverband, KreisverbandEntity } from "../entities/kreisverband";
import { Landesverband, LandesverbandEntity } from "../entities/landesverband";
import { Person, PersonEntity } from "../entities/person";

export async function sendAllEntities(res: Response<any>): Promise<any> {
  const allLandesverband: Landesverband[] = await new LandesverbandEntity().findAll();
  const allPerson: Person[] = await new PersonEntity().findAll();
  const allKreisverband: Kreisverband[] = await new KreisverbandEntity().findAll();
  res.render("all_entities", {
    data: {
      person: allPerson,
      landesverband: allLandesverband,
      kreisverband: allKreisverband
    },
  });
}
