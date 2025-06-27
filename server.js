require("dotenv").config();
require("module-alias/register");

const express = require("express");
const response = require("@/middlewares/response");
const handleErrors = require("@/middlewares/handleErrors");

const app = express();
const port = 3001;

app.use(response);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(handleErrors);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
