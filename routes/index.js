const express = require("express");
const router = express.Router();

const nextHandler = require("../nextInit").nextHandler;

router.get("/register", (req, res) => {
  return nextHandler(req, res);
});

router.post("/register", (req, res) => {
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
    res.send(errors);
  } else {
    res.redirect("/");
  }
});

module.exports = router;
