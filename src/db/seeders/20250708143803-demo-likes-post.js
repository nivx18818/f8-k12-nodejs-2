"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const likes = [];
    const combinations = new Set();

    for (let i = 0; i < 100; i++) {
      let userId, postId, combination;
      do {
        userId = Math.floor(Math.random() * 10) + 1;
        postId = Math.floor(Math.random() * 20) + 1;
        combination = `${userId}-${postId}`;
      } while (combinations.has(combination));

      combinations.add(combination);
      likes.push({
        user_id: userId,
        post_id: postId,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("likes_post", likes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("likes_post", null, {});
  },
};
