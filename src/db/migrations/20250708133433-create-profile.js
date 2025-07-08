'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("profiles", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: Sequelize.STRING(255),
      bio: Sequelize.TEXT,
      avatar: Sequelize.STRING(255),
      cover_image: Sequelize.STRING(255),
      location: Sequelize.STRING(255),
      x_twitter: Sequelize.STRING(255),
      github: Sequelize.STRING(255),
      linkedin: Sequelize.STRING(255),
      facebook: Sequelize.STRING(255),
      website: Sequelize.STRING(255),
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('profiles');
  }
};
