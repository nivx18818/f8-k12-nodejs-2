"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "johndoe",
          email: "john.doe@example.com",
          password: hashedPassword,
          name: "John Doe",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "janesmith",
          email: "jane.smith@example.com",
          password: hashedPassword,
          name: "Jane Smith",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "peterjones",
          email: "peter.jones@example.com",
          password: hashedPassword,
          name: "Peter Jones",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "marywilliams",
          email: "mary.williams@example.com",
          password: hashedPassword,
          name: "Mary Williams",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "davidbrown",
          email: "david.brown@example.com",
          password: hashedPassword,
          name: "David Brown",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "lindadavis",
          email: "linda.davis@example.com",
          password: hashedPassword,
          name: "Linda Davis",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "jamesmiller",
          email: "james.miller@example.com",
          password: hashedPassword,
          name: "James Miller",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "patriciawilson",
          email: "patricia.wilson@example.com",
          password: hashedPassword,
          name: "Patricia Wilson",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "robertmoore",
          email: "robert.moore@example.com",
          password: hashedPassword,
          name: "Robert Moore",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "jennifertaylor",
          email: "jennifer.taylor@example.com",
          password: hashedPassword,
          name: "Jennifer Taylor",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
