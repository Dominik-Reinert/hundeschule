import { Response } from "express";
import { Pruefung, PruefungDto } from "../table/pruefung_table";

export async function sendAllPruefung(res: Response<any>): Promise<any> {
  const allPruefung: Pruefung[] = await PruefungDto.findAll();
  console.info(`Found pruefung(s) in database: ${JSON.stringify(allPruefung)}`);
  res.render("all_pruefung", {
    data: {
      pruefung: allPruefung,
    },
  });
}
