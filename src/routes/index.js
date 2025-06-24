const fs = require("fs");
const path = require("path");

const express = require("express");
const mainRouter = express.Router();

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-9) === ".route.js"
    );
  })
  .forEach((file) => {
    const filename = path.join(__dirname, file);
    const subRouter = require(filename);
    mainRouter.use("/" + filename.split(".")[0], subRouter);
  });

module.exports = mainRouter;
