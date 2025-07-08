"use strict";

const { default: slugify } = require("slugify");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const topics = [
      "JavaScript",
      "Python",
      "Web Development",
      "Mobile Development",
      "Data Science",
      "Machine Learning",
      "Artificial Intelligence",
      "Cloud Computing",
      "DevOps",
      "Cybersecurity",
    ].map((name) => ({
      slug: slugify(name, { lower: true, strict: true }),
      name: name,
      description: `Everything about ${name}`,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("topics", topics, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
