require("dotenv").config();
require("module-alias/register");

const express = require("express");

const mainRouter = require("@/routes");

const response = require("@/middlewares/response");
const handleErrors = require("@/middlewares/handleErrors");
const sequelizeAuthenticate = require("@/middlewares/sequelizeAuthenticate");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use(response);
app.use("/api/v1", sequelizeAuthenticate, mainRouter);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
