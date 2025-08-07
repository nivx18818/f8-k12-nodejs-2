const fs = require("fs");
const path = require("path");

const cleanupUploadedImages = (req, res) => {
  if (!req.params?.id) next();

  const oldBlocks = req.post.content ?? [];
  const newBlocks = req.body.content ?? [];

  const oldImages = oldBlocks
    .filter((block) => block.type === "image")
    .map((block) => path.basename(block.src));

  const newImages = newBlocks
    .filter((block) => block.type === "image")
    .map((block) => path.basename(block.src));

  const deletedImages = oldImages.filter((src) => !newImages.includes(src));

  deletedImages.forEach((filename) => {
    const filePath = path.resolve("uploads", "posts", filename);
    fs.unlink(filePath, () => {});
  });

  next();
};

module.exports = cleanupUploadedImages;
