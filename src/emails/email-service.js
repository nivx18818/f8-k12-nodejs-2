const path = require("path");
const ejs = require("ejs");

exports.loadEmail = async (template, data) => {
  const emailTemplatePath = path.join(__dirname, `/templates/${template}.ejs`);
  const html = await ejs.renderFile(emailTemplatePath, data);
  return html;
};
