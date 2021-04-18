const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const catsRouter = require("./cats/cats-router.js");

const server = express();

server.use(cors(), express.json(), helmet());
server.use("/api/cats", catsRouter);

server.get("/", (req, res, next) => {
  res.status(200).json({ message: "cats is working!" });
});

server.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Server failed...";
  res.status(errorStatus).json({ message: errorMessage, stack: error.stack });
});

module.exports = server;
