import { Response } from "express";
import { Kreisverband, KreisverbandEntity } from "../entities/kreisverband";
import { Kurs, KursEntity } from "../entities/kurs";
import {
  KursTeilnehmer,
  KursTeilnehmerEntity,
} from "../entities/kurs_teilnehmer";
import { Pruefung, PruefungEntity } from "../entities/pruefung";
import { Verein, VereinEntity } from "../entities/verein";
import { Landesverband, LandesverbandDto } from "../table/landesverband_table";
import { Person, PersonDto } from "../table/person_table";

export async function sendAllEntities(res: Response<any>): Promise<any> {
  const allLandesverband: Landesverband[] = await LandesverbandDto.findAll();
  const allPerson: Person[] = await PersonDto.findAll();
  const allKreisverband: Kreisverband[] = await new KreisverbandEntity().findAll();
  const allVerein: Verein[] = await new VereinEntity().findAll();
  const allKurs: Kurs[] = await new KursEntity().findAll();
  const allPruefung: Pruefung[] = await new PruefungEntity().findAll();
  const allKursTeilnehmer: KursTeilnehmer[] = await new KursTeilnehmerEntity().findAll();
  res.render("all_entities", {
    data: {
      person: allPerson,
      landesverband: allLandesverband,
      kreisverband: allKreisverband,
      verein: allVerein,
      kurs: allKurs,
      pruefung: allPruefung,
      kursTeilnehmer: allKursTeilnehmer,
    },
  });
}
