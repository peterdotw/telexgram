const nextHandler = require("../../config/nextInit").nextHandler;

const express = require("express");
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send("Access Denied");
}

router.get("/login/redirect", ensureAuthenticated, (req, res) => {
  return res.redirect("/dashboard");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  return nextHandler(req, res);
});

module.exports = router;
