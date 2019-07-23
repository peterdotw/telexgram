const nextHandler = require("../../config/nextInit").nextHandler;

const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../../config/auth");

router.get("/", forwardAuthenticated, (req, res) => {
  return nextHandler(req, res);
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  return nextHandler(req, res);
});

module.exports = router;
