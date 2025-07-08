"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const likes = [];
    const combinations = new Set();

    for (let i = 0; i < 150; i++) {
      let userId, commentId, combination;
      do {
        userId = Math.floor(Math.random() * 10) + 1;
        commentId = Math.floor(Math.random() * 50) + 1;
        combination = `${userId}-${commentId}`;
      } while (combinations.has(combination));

      combinations.add(combination);
      likes.push({
        user_id: userId,
        comment_id: commentId,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("likes_comment", likes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("likes_comment", null, {});
  },
};
