"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "skills",
      [
        { name: "JavaScript", created_at: new Date(), updated_at: new Date() },
        { name: "Python", created_at: new Date(), updated_at: new Date() },
        { name: "Node.js", created_at: new Date(), updated_at: new Date() },
        { name: "React", created_at: new Date(), updated_at: new Date() },
        { name: "Angular", created_at: new Date(), updated_at: new Date() },
        { name: "Vue.js", created_at: new Date(), updated_at: new Date() },
        { name: "SQL", created_at: new Date(), updated_at: new Date() },
        { name: "NoSQL", created_at: new Date(), updated_at: new Date() },
        { name: "Docker", created_at: new Date(), updated_at: new Date() },
        { name: "Kubernetes", created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("skills", null, {});
  },
};
