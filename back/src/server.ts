#!/usr/bin/env node

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import exphbs from "express-handlebars";
import path from "path";
import { addDebugRoutes } from "./debug_endpoints/add_debug_routes";

export const app = express();
app.use(cors({ origin: "http://localhost:8080" }));

app.use(express.static(path.join(__dirname, "../dist")));


// To parse cookies from the HTTP Request
app.use(cookieParser());


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

addDebugRoutes(app);






app.listen(process.env.PORT || 3000);
