const EmailModel = require("../models/subscriber");
const nodemailer = require("nodemailer");
require("dotenv").config()

exports.SendNotification = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sundayudoh383@gmail.com",
      pass: process.env.APPPASSWORD || "NO_APP_PASSWORD",
    },
    pool: true,
  });

  const { message } = req.body;

  if (!message || message.trim().length < 5) {
    return res.status(400).json({ success: false, message: "Message cannot be empty" });
  }

  try {
    const emails = await EmailModel.find();

    if (emails.length === 0) {
      return res.status(404).json({ success: false, message: "No subscribers found" });
    }

    const mailOptions = {
      from: "LBR Cleaning <sundayudoh383@gmail.com>",
      to: emails.map((e) => e.email).join(","),
      subject: "New Notification from LBR Cleaning",
      text: `Dear Subscribers,\n\n${message}\n\nBest regards,\nThe LBR Cleaning Team`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Notification sent to all subscribers" });
  } catch (error) {
    console.error("Error while sending email:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending notification",
      error: error.message,
    });
  }
};


