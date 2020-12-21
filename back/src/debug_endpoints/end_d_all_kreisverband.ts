import { Response } from "express";
import { Kreisverband, KreisverbandEntity } from "../entities/kreisverband";

export async function sendAllKreisverband(res: Response<any>): Promise<any> {
  const allKreisverband: Kreisverband[] = await new KreisverbandEntity().findAll();
  console.info(`Found kreisverband in database: ${JSON.stringify(allKreisverband)}`);
  res.render("all_kreisverband", {
    data: {
      kreisverband: allKreisverband,
    },
  });
}
