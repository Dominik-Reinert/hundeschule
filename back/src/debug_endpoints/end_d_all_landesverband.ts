import { Response } from "express";
import { Landesverband, LandesverbandEntity } from "../entities/landesverband";

export async function sendAllLandesverband(res: Response<any>): Promise<any> {
  const allLandesverband: Landesverband[] = await new LandesverbandEntity().findAll();
  console.info(`Found landesverband in database: ${JSON.stringify(allLandesverband)}`);
  res.render("all_landesverband", {
    data: {
      Landesverband: allLandesverband,
    },
  });
}
