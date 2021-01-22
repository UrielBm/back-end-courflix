const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");

const sessionMiddleware = session({
  name: "login-courflix",
  secret: "3sUn4C0ntr4s3ll4F4c1l",
  saveUninitialized: false,
  resave: false,
});
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

module.exports = app;
