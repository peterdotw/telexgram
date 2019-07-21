const compression = require("compression");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
//const mongoose = require("mongoose");
const helmet = require("helmet");

const next = require("./nextInit").next;
const nextApp = require("./nextInit").nextApp;
const nextHandler = require("./nextInit").nextHandler;

const port = process.env.PORT || 3000;
/*
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(console.log("MongoDB connected"))
  .catch(err => console.log(err));
*/
let numUsers = 0;

nextApp
  .prepare()
  .then(() => {
    app.use(helmet());
    app.use(express.urlencoded({ extended: false }));
    app.use("/", require("./routes/index.js"));
    app.use(compression());

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
