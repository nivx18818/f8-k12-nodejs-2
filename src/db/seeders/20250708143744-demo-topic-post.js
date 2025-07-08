"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const topicPosts = [];
    const combinations = new Set();

    for (let i = 0; i < 30; i++) {
      let postId, topicId, combination;
      do {
        postId = Math.floor(Math.random() * 20) + 1;
        topicId = Math.floor(Math.random() * 10) + 1;
        combination = `${postId}-${topicId}`;
      } while (combinations.has(combination));

      combinations.add(combination);
      topicPosts.push({
        post_id: postId,
        topic_id: topicId,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("topic_post", topicPosts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topic_post", null, {});
  },
};
