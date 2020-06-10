const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");
const Messages = require("../../models/Messages");

const {
  registerValidation,
  loginValidation,
} = require("../../config/validation");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send("Access Denied");
}

router.post("/register", (req, res) => {
  console.log(req.body);
  const { login, password } = req.body;

  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  User.findOne({ login: login }).then((user) => {
    if (user) return res.send("User already exists");

    const newUser = new User({
      login,
      password,
    });

    newUser
      .save()
      .then(() => {
        return res.send("OK");
      })
      .catch((err) => console.log(err));
  });
});

router.post("/login", function (req, res, next) {
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);

  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) return res.send("User not found");
    req.login(user, (err) => {
      if (err) return next(err);
      res.send("OK");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Logged out");
});

router.get("/chats", ensureAuthenticated, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  Messages.find({}).then((chat) => {
    res.json(chat);
  });
});

module.exports = router;
