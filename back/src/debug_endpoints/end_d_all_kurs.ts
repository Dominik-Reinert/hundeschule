import { Response } from "express";
import { Kurs, KursDto } from "../table/kurs_table";

export async function sendAllKurs(res: Response<any>): Promise<any> {
  const allKurs: Kurs[] = await KursDto.findAll();
  console.info(`Found kurs(s) in database: ${JSON.stringify(allKurs)}`);
  res.render("all_kurs", {
    data: {
      kurs: allKurs,
    },
  });
}
