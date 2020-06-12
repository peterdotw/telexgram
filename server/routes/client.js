const express = require("express");
const router = express.Router();

const nextHandler = require("../../config/nextInit").nextHandler;
const ensureAuthenticated = require("../../config/ensureAuthenticated");

router.get("/login/redirect", ensureAuthenticated, (_, res) => {
  return res.redirect("/dashboard");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  return nextHandler(req, res);
});

module.exports = router;
