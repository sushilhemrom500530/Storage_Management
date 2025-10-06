import nodemailer from "nodemailer";
import { envVars } from "../config/env";

export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send email
export const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: envVars.EMAIL_SENDER.SMTP_FROM,
      pass: envVars.EMAIL_SENDER.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"Storage Management" <${envVars.EMAIL_SENDER.SMTP_FROM}>`,
    to: email,
    subject: "Password Reset Verification Code",
    html,
  });
};
