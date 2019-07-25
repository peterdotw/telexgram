const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

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

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            console.log(newUser);
            return res.status(200).send({ user: user._id });
          })
          .catch(err => console.log(err));
      });
    });
  });
});

router.get("/login", verify, (req, res) => {
  console.log(req.user._id);
  User.findOne({ _id: req.user._id }).then(user => {
    if (!user) return res.status(400).send("User not found");
    console.log(user);
    res.send(user.login);
  });
});

router.post("/login", async function(req, res) {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    login: req.body.login
  });
  if (!user) return res.status(400).send("User not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
