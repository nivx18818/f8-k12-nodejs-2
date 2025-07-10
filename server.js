require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");

const mainRouter = require("@/routes");

const response = require("@/middlewares/response");
const handleErrors = require("@/middlewares/handle-errors");
const sequelizeAuthenticate = require("@/middlewares/sequelize-authenticate");

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded());

app.use(response);
app.use("/api/v1", sequelizeAuthenticate, mainRouter);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
