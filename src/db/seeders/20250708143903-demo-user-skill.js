"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userSkills = [];
    const combinations = new Set();

    for (let i = 0; i < 20; i++) {
      let userId, skillId, combination;
      do {
        userId = Math.floor(Math.random() * 10) + 1;
        skillId = Math.floor(Math.random() * 10) + 1;
        combination = `${userId}-${skillId}`;
      } while (combinations.has(combination));

      combinations.add(combination);
      userSkills.push({
        user_id: userId,
        skill_id: skillId,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("user_skill", userSkills, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_skill", null, {});
  },
};
