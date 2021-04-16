const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const pastaRouter = require("./pastas/pasta-router.js");

const server = express();

server.use(cors(), express.json(), helmet());
server.use("/api/pastas", pastaRouter);

server.get("/", (req, res, next) => {
  res.status(200).json({ api: "up" });
});

server.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Server failed...";
  res.status(errorStatus).json({ message: errorMessage, stack: error.stack });
});

module.exports = server;
