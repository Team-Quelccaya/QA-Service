const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes");

var redis = require("redis");

// Simply pass the port that you want a Redis server to listen on.

app.use(morgan("dev"));
app.use(bodyParser.json());

const PORT = 8080;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.get("/loaderio-ae15179c0f70e63e972ee9d0fa199b72", (req, res) => {
  res.send("loaderio-ae15179c0f70e63e972ee9d0fa199b72");
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  next();
});

app.use("/qa", router);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
