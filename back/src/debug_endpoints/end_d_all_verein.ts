import { Response } from "express";
import { Verein, VereinDto } from "../table/verein_table";

export async function sendAllVerein(res: Response<any>): Promise<any> {
  const allVerein: Verein[] = await VereinDto.findAll();
  console.info(`Found verein(s) in database: ${JSON.stringify(allVerein)}`);
  res.render("all_verein", {
    data: {
      verein: allVerein,
    },
  });
}
