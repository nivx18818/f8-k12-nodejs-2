"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [...Array(250)].map(() => ({
      slug: faker.lorem.slug(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    }));
    await queryInterface.bulkInsert("posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
