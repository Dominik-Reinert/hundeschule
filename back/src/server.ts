#!/usr/bin/env node

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import exphbs from "express-handlebars";
import path from "path";
import { addDebugRoutes } from "./debug_endpoints/add_debug_routes";
import { errorHandling } from "./middleware/error_handling";
import { NotFoundError } from "./middleware/not_found_error";
import { AppUserDto, AppUserJoined } from "./table/app_user_table";

export const app = express();
app.use(cors({ origin: "http://localhost:8080", credentials: true }));

app.use(express.static(path.join(__dirname, "../dist")));

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.use(express.json());

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

/***********************************************/
/** test endpoints for registration and login **/
/***********************************************/

app.get("/register", (req, res) => {
  res.render("register");
});

const crypto = require("crypto");

const getHashedPassword = (password: string) => {
  const sha512 = crypto.createHash("sha512");
  const hash = sha512.update(password).digest("base64");
  return hash;
};

app.post("/register", async (req, res, next) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword && email) {
    const appUserWithEmail: AppUserJoined | null = await AppUserDto.findByEmailJoined(
      email
    );

    // Check if user with the same email is also registered
    if (appUserWithEmail !== null) {
      res.render("register", {
        message: "User already registered.",
        messageClass: "alert-danger",
      });

      return;
    }

    const passwordHash = getHashedPassword(password);

    await AppUserDto.insertJoined({
      vorname: firstName,
      name: lastName,
      email,
      isAdmin: false,
      password: passwordHash,
    });

    res.render("login", {
      message: "Registration Complete. Please login to continue.",
      messageClass: "alert-success",
    });
  } else {
    res.render("register", {
      message: "Password does not match.",
      messageClass: "alert-danger",
    });
  }
});

app.get("/login", async (req, res) => {
  res.render("login");
});

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const appUser: AppUserJoined | null = await AppUserDto.findByEmailJoined(
    email
  );
  console.info(`found app user: ${JSON.stringify(appUser)}`);
  if (appUser !== null && appUser.password === hashedPassword) {
    const authToken = generateAuthToken();

    // Setting the auth token in cookies
    res.cookie("AuthToken", authToken, {
      maxAge: 24 * 60 * 60 * 1000 /* 24 hours */,
      domain: "localhost:3000",
      httpOnly: true,
      sameSite: app.get("env") === "development" ? true : "none",
      secure: app.get("env") === "development" ? false : true,
    });

    // Redirect user to the protected page
    res.redirect("/protected");
  } else {
    throw new NotFoundError();
  }
});

//error handling always needs to be last middleware!
app.use(errorHandling);
