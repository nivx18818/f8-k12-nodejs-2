"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userFollowers = [];
    const combinations = new Set();

    for (let i = 0; i < 30; i++) {
      let followedId, followerId, combination;
      do {
        followedId = Math.floor(Math.random() * 10) + 1;
        followerId = Math.floor(Math.random() * 10) + 1;
        combination = `${followedId}-${followerId}`;
      } while (followedId === followerId || combinations.has(combination));

      combinations.add(combination);
      userFollowers.push({
        followed_id: followedId,
        follower_id: followerId,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("user_follower", userFollowers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_follower", null, {});
  },
};
