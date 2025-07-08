"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const profiles = [];
    for (let i = 1; i <= 10; i++) {
      profiles.push({
        user_id: i,
        title: `Software Developer ${i}`,
        bio: `I am a passionate developer with experience in various technologies.`,
        avatar: `https://i.pravatar.cc/150?u=user${i}`,
        location: "Remote",
        github: `github.com/user${i}`,
        linkedin: `linkedin.com/in/user${i}`,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("profiles", profiles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("profiles", null, {});
  },
};
