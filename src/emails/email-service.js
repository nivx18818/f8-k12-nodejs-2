const path = require("path");
const ejs = require("ejs");
const { transporter } = require("@/config/mailer");

exports.sendMail = async (template, subject, user, data) => {
  const emailTemplatePath = path.join(__dirname, `/templates/${template}.ejs`);
  const html = await ejs.renderFile(emailTemplatePath, { user, ...data });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: user.email,
    subject,
    html,
  });
};
