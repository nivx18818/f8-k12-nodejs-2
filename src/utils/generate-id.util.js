const { v4: uuidv4 } = require("uuid");

const generateId = () => `${Date.now()}-${uuidv4()}`;

module.exports = generateId;
