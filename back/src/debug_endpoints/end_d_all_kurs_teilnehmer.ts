import { Response } from "express";
import { KursTeilnehmer, KursTeilnehmerEntity } from "../entities/kurs_teilnehmer";

export async function sendAllKursTeilnehmer(res: Response<any>): Promise<any> {
  const allKursTeilnehmer: KursTeilnehmer[] = await new KursTeilnehmerEntity().findAll();
  console.info(`Found kursteilnehmer in database: ${JSON.stringify(allKursTeilnehmer)}`);
  res.render("all_kurs_teilnehmer", {
    data: {
      kursteilnehmer: allKursTeilnehmer,
    },
  });
}
