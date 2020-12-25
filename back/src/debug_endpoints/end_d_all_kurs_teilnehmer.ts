import { Response } from "express";
import {
  Kursteilnehmer,
  KursteilnehmerDto,
} from "../table/kursteilnehmer_table";

export async function sendAllKursTeilnehmer(res: Response<any>): Promise<any> {
  const allKursTeilnehmer: Kursteilnehmer[] = await KursteilnehmerDto.findAll();
  console.info(
    `Found kursteilnehmer in database: ${JSON.stringify(allKursTeilnehmer)}`
  );
  res.render("all_kurs_teilnehmer", {
    data: {
      kursteilnehmer: allKursTeilnehmer,
    },
  });
}
