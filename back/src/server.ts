#!/usr/bin/env node

import bodyParser from "body-parser";
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

const users = [
  // This user is added to the array to avoid creating a new user on each restart
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    // This is the SHA256 hash for value of `password`
    password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
  },
];
const crypto = require("crypto");

const getHashedPassword = (password: string) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

app.post("/register", (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    // Check if user with the same email is also registered
    if (users.find((user) => user.email === email)) {
      res.render("register", {
        message: "User already registered.",
        messageClass: "alert-danger",
      });

      return;
    }

    const hashedPassword = getHashedPassword(password);

    // Store user into the database if you are using one
    users.push({
      firstName,
      lastName,
      email,
      password: hashedPassword,
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

app.get("/login", (req, res) => {
  res.render("login");
});

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

// This will hold the users and authToken related to users
const authTokens: {
  [key: string]: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
} = {};

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const user = users.find((u) => {
    return u.email === email && hashedPassword === u.password;
  });

  if (user) {
    const authToken = generateAuthToken();

    // Store authentication token
    authTokens[authToken] = user;

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
