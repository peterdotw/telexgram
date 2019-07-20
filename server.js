const compression = require("compression");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
//const mongoose = require("mongoose");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = process.env.PORT || 3000;
/*
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(console.log("MongoDB connected"))
  .catch(err => console.log(err));
*/
let numUsers = 0;

app.use(express.urlencoded({ extended: false }));
app.use(compression());

nextApp
  .prepare()
  .then(() => {
    io.on("connection", socket => {
      ++numUsers;
      io.emit("userCount", { userCount: numUsers });
      console.log(`Connected: ${numUsers} sockets connected`);

      socket.on("disconnect", () => {
        --numUsers;
        io.emit("userCount", { userCount: numUsers });
        console.log(`Disconnected: ${numUsers} sockets connected`);
      });
    });

    app.get("/register", (req, res) => {
      const actualPage = "/register";
      console.log("Register Page works");
      nextApp.render(req, res, actualPage);
    });

    app.post("/register", (req, res) => {
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
        res.send("pass");
      }
    });

    app.get("/login", (req, res) => {
      res.send("Login Page");
    });

    app.get("*", (req, res) => {
      return nextHandler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
