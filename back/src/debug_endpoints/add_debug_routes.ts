import { Express } from "express";
import { debugPathPrefix } from "./debug_path_prefix";
import { sendAllEntities } from "./end_d_all_entities";
import { sendAllKurs } from "./end_d_all_kurs";
import { sendAllKursTeilnehmer } from "./end_d_all_kurs_teilnehmer";
import { sendAllLandesverband } from "./end_d_all_landesverband";
import { sendAllPerson } from "./end_d_all_person";
import { sendAllPruefung } from "./end_d_all_pruefung";
import { sendAllVerein } from "./end_d_all_verein";

export function addDebugRoutes(app: Express): void {
  app.get("/", function (req, res) {
    res.render("home");
  });
  app.get(`${debugPathPrefix}/person`, (req, res) => sendAllPerson(res));
  app.get(`${debugPathPrefix}/landesverband`, (req, res) =>
    sendAllLandesverband(res)
  );
  app.get(`${debugPathPrefix}/kreisverband`, (req, res) =>
    sendAllLandesverband(res)
  );
  app.get(`${debugPathPrefix}/verein`, (req, res) => sendAllVerein(res));
  app.get(`${debugPathPrefix}/kurs`, (req, res) => sendAllKurs(res));
  app.get(`${debugPathPrefix}/pruefung`, (req, res) => sendAllPruefung(res));
  app.get(`${debugPathPrefix}/kurs_teilnehmer`, (req, res) =>
    sendAllKursTeilnehmer(res)
  );
  app.get(`${debugPathPrefix}/all`, (req, res) => sendAllEntities(res));
}
