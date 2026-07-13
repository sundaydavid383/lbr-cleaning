// filepath: ibrback/src/config/mailer.js
require("dotenv").config();
const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS || process.env.APPPASSWORD,
    },
    pool: true,
  });
};

module.exports = { createTransporter };
