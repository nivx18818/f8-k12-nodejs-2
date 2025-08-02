const emailService = require("@/emails/email-service");
const jwtService = require("@/services/jwt.service");
const userService = require("@/services/user.service");

const sendVerificationEmail = async (job) => {
  const { userId } = job.payload;
  const user = await userService.getById(userId);

  const token = jwtService.sign({ userId });
  const verificationUrl = `${process.env.APP_ORIGIN}/verify-email?token=${token}`;

  await emailService.sendMail("verification", "Email Verification", user, { verificationUrl });
};

module.exports = sendVerificationEmail;
