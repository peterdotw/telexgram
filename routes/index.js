const express = require("express");
const router = express.Router();

const nextApp = require("../nextInit").nextApp;
const nextHandler = require("../nextInit").nextHandler;

const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/register", (req, res) => {
  return nextHandler(req, res);
});

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
    errors.push({ msg: "Password too short!" });
  }

  if (errors.length > 0) {
    //TODO error handling for client and re-render page with errors array
    //return nextApp.render(req, res, "/register", { errors });
    console.log(errors);
    res.send(errors);
  } else {
    User.findOne({ login: login }).then(user => {
      if (user) {
        //TODO if user exists error handle for client
        errors.push({ msg: "User already exists!" });
        res.send(errors);
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
                res.redirect("/");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.get("/login", (req, res) => {
  return res.send("logged in");
});

router.post("/login", (req, res) => {
  return res.redirect("/login");
});

module.exports = router;
