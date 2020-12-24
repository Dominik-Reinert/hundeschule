#!/usr/bin/env node

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import exphbs from "express-handlebars";
import path from "path";
import { addDebugRoutes } from "./debug_endpoints/add_debug_routes";
import { AppUserPerson, AppUserPersonDto } from "./dto/app_user_person_dto";
import { AuthTokenEntity } from "./entities/auth_token";

export const app = express();
app.use(cors({ origin: "http://localhost:8080" }));

app.use(express.static(path.join(__dirname, "../dist")));

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/register", async (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  const appUserToPersonDto = new AppUserPersonDto();

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    const appUserWithEmail: AppUserPerson = await appUserToPersonDto.findByEmail(
      email
    );

    // Check if user with the same email is also registered
    if (appUserWithEmail !== undefined) {
      res.render("register", {
        message: "User already registered.",
        messageClass: "alert-danger",
      });

      return;
    }

    const passwordHash = getHashedPassword(password);

    // Store user into the database if you are using one
    await appUserToPersonDto.insert({
      vorname: firstName,
      name: lastName,
      email,
      passwordHash,
    } as any);

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

  const appUser: any = await new AppUserPersonDto().findByEmail(email);
  console.info(`found app user: ${JSON.stringify(appUser)}`);
  if (appUser !== undefined && appUser.passwordHash === hashedPassword) {
    const authToken = generateAuthToken();
    const authTokenEntity = new AuthTokenEntity();
    await authTokenEntity.insert({
      personId: appUser.id as number,
      token: authToken,
    });

    // Setting the auth token in cookies
    res.cookie("AuthToken", authToken);

    // Redirect user to the protected page
    res.redirect("/protected");
  } else {
    res.render("login", {
      message: "Invalid username or password",
      messageClass: "alert-danger",
    });
  }
});
