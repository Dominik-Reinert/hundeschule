import { Response } from "express";
import { Kurs, KursEntity } from "../entities/kurs";

export async function sendAllKurs(res: Response<any>): Promise<any> {
  const allKurs: Kurs[] = await new KursEntity().findAll();
  console.info(`Found kurs(s) in database: ${JSON.stringify(allKurs)}`);
  res.render("all_kurs", {
    data: {
      kurs: allKurs,
    },
  });
}
