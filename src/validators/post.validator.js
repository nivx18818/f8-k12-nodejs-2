const createValidator = require("@/utils/create-validator.util");

const postSchema = {
  title: {
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Title must be between 1 and 255 characters",
    },
  },
  description: {},
  coverImage: {},
  content: {},
  status: {
    isIn: {
      options: [["published", "draft"]],
      errorMessage: "Status must be either 'published' or 'draft'",
    },
  },
  visibility: {
    isIn: {
      options: [["public", "followers", "private"]],
      errorMessage: "Visibility must be either 'public', 'followers', or 'private'",
    },
  },
};

module.exports = {
  create: createValidator(postSchema, {
    required: "all",
    optional: ["coverImage", "status", "visibility"],
  }),
  update: createValidator(postSchema),
};
