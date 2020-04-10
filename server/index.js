const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes");

app.use(morgan("dev"));
app.use(bodyParser.json());

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/questions", router);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
