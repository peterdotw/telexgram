const nextHandler = require("../../config/nextInit").nextHandler;

const express = require("express");
const router = express.Router();

const verify = require("./verifyToken");
/*

router.get("/", forwardAuthenticated, (req, res) => {
  return nextHandler(req, res);
});

*/

router.get("/dashboard", verify, (req, res) => {
  return nextHandler(req, res);
});

module.exports = router;
