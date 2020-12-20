#!/usr/bin/env node

import cors from "cors";
import express from "express";
import "express-async-errors";
import exphbs from "express-handlebars";
import path from "path";
import { debugPathPrefix } from "./debug_endpoints/debug_path_prefix";
import { sendAllPerson } from "./debug_endpoints/end_d_all_person";

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

app.listen(process.env.PORT || 3000);
