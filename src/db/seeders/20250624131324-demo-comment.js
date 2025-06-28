"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [...Array(1250)].map(() => ({
      post_id: faker.number.int({ min: 1, max: 250 }),
      content: faker.lorem.paragraph(),
    }));
    await queryInterface.bulkInsert("comments", comments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
