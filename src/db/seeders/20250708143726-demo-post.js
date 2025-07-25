"use strict";

const { default: slugify } = require("slugify");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [];
    for (let i = 1; i <= 20; i++) {
      const title = `Post Title ${i}`;
      posts.push({
        user_id: Math.floor(Math.random() * 10) + 1,
        slug: slugify(title, { lower: true, strict: true }),
        title: title,
        description: `This is the description of post ${i}.`,
        cover_image: `https://picsum.photos/seed/post${i}/800/400`,
        content: `This is the content of post ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.`,
        status: i % 3 === 0 ? "draft" : "published",
        visibility: "public",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
