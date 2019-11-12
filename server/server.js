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

const User = require("../models/User");
const Messages = require("../models/Messages");

const { authStrategy } = require("../config/authStrategy");

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

    passport.use(authStrategy);
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

    io.on("connection", socket => {
      io.emit("userCount", { userCount: io.engine.clientsCount });
      console.log(`Connected: ${io.engine.clientsCount} sockets connected`);

      socket.on("userCount", () => {
        io.emit("userCount", { userCount: io.engine.clientsCount });
      });

      socket.on("disconnect", () => {
        io.emit("userCount", { userCount: io.engine.clientsCount });
        console.log(
          `Disconnected: ${io.engine.clientsCount} sockets connected`
        );
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
