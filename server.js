const compression = require("compression");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = process.env.PORT || 3000;

let numUsers = 0;

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
