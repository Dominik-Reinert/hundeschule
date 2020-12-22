import { Response } from "express";
import { Pruefung, PruefungEntity } from "../entities/pruefung";

export async function sendAllPruefung(res: Response<any>): Promise<any> {
  const allPruefung: Pruefung[] = await new PruefungEntity().findAll();
  console.info(`Found pruefung(s) in database: ${JSON.stringify(allPruefung)}`);
  res.render("all_pruefung", {
    data: {
      pruefung: allPruefung,
    },
  });
}
