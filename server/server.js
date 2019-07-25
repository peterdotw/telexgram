require("dotenv").config();
const compression = require("compression");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const next = require("../config/nextInit").next;
const nextApp = require("../config/nextInit").nextApp;
const nextHandler = require("../config/nextInit").nextHandler;

const port = process.env.PORT || 3000;

const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

let numUsers = 0;

nextApp
  .prepare()
  .then(() => {
    app.use(helmet());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use("/api", require("./routes/api"));
    app.use("/", require("./routes/client"));
    app.use(compression());

    //TODO: properly working counter
    io.on("connection", socket => {
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
