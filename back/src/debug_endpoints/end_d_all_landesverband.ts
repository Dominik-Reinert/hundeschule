import { Response } from "express";
import { Landesverband, LandesverbandDto } from "../table/landesverband_table";

export async function sendAllLandesverband(res: Response<any>): Promise<any> {
  const allLandesverband: Landesverband[] = await LandesverbandDto.findAll();
  console.info(
    `Found landesverband in database: ${JSON.stringify(allLandesverband)}`
  );
  res.render("all_landesverband", {
    data: {
      Landesverband: allLandesverband,
    },
  });
}
