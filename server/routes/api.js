const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../../config/auth");

router.post("/register", (req, res, next) => {
  console.log(req.body);
  const { login, password, confirmPassword } = req.body;

  let errors = [];

  if (!login || !password || !confirmPassword) {
    errors.push({ msg: "Fill in all fields!" });
  }

  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords do not match!" });
  }

  if (password.length < 6) {
    errors.push({
      msg: "Password too short! Must contain minimum 6 characters."
    });
  }

  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).json(errors);
  } else {
    User.findOne({ login: login }).then(user => {
      if (user) {
        errors.push({ msg: "User already exists!" });
        console.log(errors);
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          login,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                console.log(newUser);
              })
              .catch(err => console.log(err));
          });
        });
        return res.status(200).json("Registered!");
      }
    });
  }
});

router.get("/login", ensureAuthenticated, (req, res) => {
  User.find().then(user => {
    return res.json({ user });
  });
});

router.post("/login", passport.authenticate("local"), function(req, res) {
  console.log(req.body);
  return res.status(200).json("Logged in!");
});

router.get("/logout", (req, res) => {
  req.logout();
  console.log("Logged out");
  return res.status(200).json("Logged out!");
});

module.exports = router;
