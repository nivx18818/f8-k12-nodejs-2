"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [];
    for (let i = 1; i <= 50; i++) {
      comments.push({
        post_id: Math.floor(Math.random() * 20) + 1,
        user_id: Math.floor(Math.random() * 10) + 1,
        parent_id: null,
        content: `This is a comment number ${i}. Great post!`,
        status: "visible",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("comments", comments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
