"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const topics = [...Array(5)].map(() => ({
      slug: faker.lorem.slug(),
      title: faker.lorem.words({ min: 1, max: 2 }),
      description: faker.lorem.paragraphs(),
    }));
    await queryInterface.bulkInsert("topics", topics, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
