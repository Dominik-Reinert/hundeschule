#!/usr/bin/env node

import cors from "cors";
import express from "express";
import "express-async-errors";
import exphbs from "express-handlebars";
import path from "path";
import { debugPathPrefix } from "./debug_endpoints/debug_path_prefix";
import { sendAllEntities } from "./debug_endpoints/end_d_all_entities";
import { sendAllKurs } from "./debug_endpoints/end_d_all_kurs";
import { sendAllKursTeilnehmer } from "./debug_endpoints/end_d_all_kurs_teilnehmer";
import { sendAllLandesverband } from "./debug_endpoints/end_d_all_landesverband";
import { sendAllPerson } from "./debug_endpoints/end_d_all_person";
import { sendAllPruefung } from "./debug_endpoints/end_d_all_pruefung";
import { sendAllVerein } from "./debug_endpoints/end_d_all_verein";

export const app = express();
app.use(cors({ origin: "http://localhost:8080" }));

app.use(express.static(path.join(__dirname, "../dist")));

app.set("views", path.resolve(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      debugPrint: (e: any) => JSON.stringify(e),
    },
  })
);
app.set("view engine", "handlebars");

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
app.get(`${debugPathPrefix}/kurs_teilnehmer`, (req, res) => sendAllKursTeilnehmer(res));
app.get(`${debugPathPrefix}/all`, (req, res) => sendAllEntities(res));

app.listen(process.env.PORT || 3000);
