#!/usr/bin/env node

import express from "express";
import "express-async-errors";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:8080" }));

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(process.env.PORT || 3000);
