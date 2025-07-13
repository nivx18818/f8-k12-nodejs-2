const transporter = require("@/config/mailer");
const emailService = require("@/emails/email-service");
const jwtService = require("@/services/jwt.service");
const userService = require("@/services/user.service");

const sendVerificationEmail = async (job) => {
  const { userId } = job.payload;
  const user = await userService.getById(userId);

  const token = jwtService.sign(userId);
  const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

  const emailTemplate = await emailService.loadEmail("verification", {
    user,
    verificationUrl,
  });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER_SAMPLE, // user.email
    subject: `Email Verification for ${user.name}`,
    html: emailTemplate,
  });
};

module.exports = sendVerificationEmail;
