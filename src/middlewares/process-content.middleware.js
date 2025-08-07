const processContent = (req, res) => {
  const blocks = req.body.content;
  const files = req.files ?? [];
  let fileIndex = 0;

  req.body.content = blocks.map((block) => {
    if (block.type !== "image") return block;

    const parsedUrl = new URL(block.src);
    if (["http:", "https:"].includes(parsedUrl.protocol)) {
      return block;
    }

    const file = files[fileIndex];
    fileIndex++;

    return {
      ...block,
      src: file ? `${process.env.APP_ORIGIN}/uploads/posts/${file.filename}` : block.src,
    };
  });

  next();
};

module.exports = processContent;
