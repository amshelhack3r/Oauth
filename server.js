const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const strategy = require("./config/passport");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const session = require("express-session");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();

mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Connected to mlabs");
  })
  .catch(err => {
    console.log(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

strategy(passport);

app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/oauth", indexRouter);
app.use("/oauth/auth", authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port ${port}`));
