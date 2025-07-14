const { default: slugify } = require("slugify");

const generateSlug = (id, text) => {
  return `${slugify(text, { lower: true, strict: true })}-${id}-${Date.now()}`;
};

module.exports = generateSlug;
