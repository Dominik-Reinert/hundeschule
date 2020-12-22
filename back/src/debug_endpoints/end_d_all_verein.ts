import { Response } from "express";
import { Verein, VereinEntity } from "../entities/verein";

export async function sendAllVerein(res: Response<any>): Promise<any> {
  const allVerein: Verein[] = await new VereinEntity().findAll();
  console.info(`Found verein(s) in database: ${JSON.stringify(allVerein)}`);
  res.render("all_verein", {
    data: {
      verein: allVerein,
    },
  });
}
