const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");

const {
  registerValidation,
  loginValidation
} = require("../../config/validation");

router.post("/register", (req, res) => {
  console.log(req.body);
  const { login, password } = req.body;

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ login: login }).then(user => {
    if (user) return res.status(400).send("User already exists");

    const newUser = new User({
      login,
      password
    });

    newUser
      .save()
      .then(user => {
        console.log(newUser);
        return res.status(200).send({ user: user._id });
      })
      .catch(err => console.log(err));
  });
});

router.post("/login", function(req, res, next) {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).send("User not found");
    req.login(user, err => {
      if (err) return next(err);
      res.status(200).send(req.user.login);
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Logged out");
});

module.exports = router;
