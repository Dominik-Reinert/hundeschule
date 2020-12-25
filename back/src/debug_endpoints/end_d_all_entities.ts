import { Response } from "express";
import {
  KursTeilnehmer,
  KursTeilnehmerEntity,
} from "../entities/kurs_teilnehmer";
import { Kreisverband, KreisverbandDto } from "../table/kreisverband_table";
import { Kurs, KursDto } from "../table/kurs_table";
import { Landesverband, LandesverbandDto } from "../table/landesverband_table";
import { Person, PersonDto } from "../table/person_table";
import { Pruefung, PruefungDto } from "../table/pruefung_table";
import { Verein, VereinDto } from "../table/verein_table";

export async function sendAllEntities(res: Response<any>): Promise<any> {
  const allLandesverband: Landesverband[] = await LandesverbandDto.findAll();
  const allPerson: Person[] = await PersonDto.findAll();
  const allKreisverband: Kreisverband[] = await KreisverbandDto.findAll();
  const allVerein: Verein[] = await VereinDto.findAll();
  const allKurs: Kurs[] = await KursDto.findAll();
  const allPruefung: Pruefung[] = await PruefungDto.findAll();
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
