import { Response } from "express";
import { Kreisverband, KreisverbandEntity } from "../entities/kreisverband";
import { Kurs, KursEntity } from "../entities/kurs";
import { Landesverband, LandesverbandEntity } from "../entities/landesverband";
import { Person, PersonEntity } from "../entities/person";
import { Pruefung, PruefungEntity } from "../entities/pruefung";
import { Verein, VereinEntity } from "../entities/verein";

export async function sendAllEntities(res: Response<any>): Promise<any> {
  const allLandesverband: Landesverband[] = await new LandesverbandEntity().findAll();
  const allPerson: Person[] = await new PersonEntity().findAll();
  const allKreisverband: Kreisverband[] = await new KreisverbandEntity().findAll();
  const allVerein: Verein[] = await new VereinEntity().findAll();
  const allKurs: Kurs[] = await new KursEntity().findAll();
  const allPruefung: Pruefung[] = await new PruefungEntity().findAll();
  res.render("all_entities", {
    data: {
      person: allPerson,
      landesverband: allLandesverband,
      kreisverband: allKreisverband,
      verein: allVerein,
      kurs: allKurs,
      pruefung: allPruefung,
    },
  });
}
