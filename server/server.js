require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const compression = require("compression");
const uid = require("uid-safe");

const nextApp = require("../config/nextInit").nextApp;
const nextHandler = require("../config/nextInit").nextHandler;

const port = process.env.PORT || 3000;

const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

let numUsers = 0;

const User = require("../models/User");
const Messages = require("../models/Messages");

const { myStrategy } = require("../config/authStrategy");

nextApp
  .prepare()
  .then(() => {
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(
      session({
        secret: uid.sync(18),
        cookie: {
          maxAge: 3600000
        },
        resave: false,
        saveUninitialized: true
      })
    );

    passport.use(myStrategy);
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id, done) =>
      User.findById(id, function(err, user) {
        done(err, user.login);
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/api", require("./routes/api"));
    app.use("/", require("./routes/client"));
    app.use(compression());

    //TODO: properly working counter
    io.on("connection", socket => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        --numUsers;
        io.emit("userCount", { userCount: numUsers });
        console.log(`Disconnected: ${numUsers} sockets connected`);
      });

      socket.on("addCount", () => {
        ++numUsers;
        io.emit("userCount", { userCount: numUsers });
        console.log(`Connected: ${numUsers} sockets connected`);
      });

      socket.on("fetchCount", () => {
        io.emit("userCount", { userCount: numUsers });
        console.log(`Connected: ${numUsers} sockets connected`);
      });

      socket.on("send message", data => {
        io.emit("receive message", data);
        console.log(data);
        let chatMessage = new Messages({
          message: data.message,
          author: data.author
        });
        chatMessage.save();
      });
    });

    app.get("*", (req, res) => {
      return nextHandler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
