import { Response } from "express";
import { Kreisverband, KreisverbandDto } from "../table/kreisverband_table";

export async function sendAllKreisverband(res: Response<any>): Promise<any> {
  const allKreisverband: Kreisverband[] = await KreisverbandDto.findAll();
  console.info(
    `Found kreisverband in database: ${JSON.stringify(allKreisverband)}`
  );
  res.render("all_kreisverband", {
    data: {
      kreisverband: allKreisverband,
    },
  });
}
