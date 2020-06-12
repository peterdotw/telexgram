const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");
const Messages = require("../../models/Messages");
const ensureAuthenticated = require("../../config/ensureAuthenticated");

const {
  registerValidation,
  loginValidation,
} = require("../../config/validation");

router.post("/register", (req, res) => {
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

router.post("/login", (req, res, next) => {
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
  res.send("Logged out");
});

router.get("/chats", ensureAuthenticated, (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  Messages.find({}).then((chat) => {
    res.json(chat);
  });
});

module.exports = router;
