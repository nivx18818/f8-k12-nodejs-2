const fs = require("fs");
const path = require("path");
const express = require("express");
const { Op } = require("sequelize");
const models = require("@/db/models");

const mainRouter = express.Router();
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-9) === ".route.js"
  )
  .forEach((file) => {
    const subRouter = require(path.join(__dirname, file));
    const resource = file.split(".")[0]; // Ex: posts.route.js -> posts
    const modelName = resource[0].toUpperCase() + resource.slice(1, -1); // Ex: posts -> Post
    const model = models[modelName];

    subRouter.param("id", async (req, res, next, id) => {
      const whereConditions = [{ id }];
      if (model.rawAttributes.slug) {
        whereConditions.push({ slug: id });
      }

      const value = await model.findOne({
        where: { [Op.or]: whereConditions },
      });
      if (!value) return res.error404(`${modelName} not found`);
      req[modelName.toLowerCase()] = value;
      next();
    });

    mainRouter.use(`/${resource}`, subRouter);
  });

module.exports = mainRouter;
