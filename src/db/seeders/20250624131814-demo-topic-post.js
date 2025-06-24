"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const topicToPost = [...Array(1250)].map(() => ({
      topic_id: faker.number.int({ min: 1, max: 5 }),
      post_id: faker.number.int({ min: 1, max: 250 }),
    }));
    await queryInterface.bulkInsert("topic_post", topicToPost, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topic_post", null, {});
  },
};
