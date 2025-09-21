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
  to: emails.map((e) => e.email).join(","), // all subscribers
  subject: "New Notification from LBR Cleaning",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
      <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: rgb(36, 170, 36); color: white; text-align: center; padding: 20px;">
          <h1 style="margin: 0; font-size: 22px;">LBR Cleaning</h1>
          <p style="margin: 0; font-size: 14px;">Making your space shine ✨</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 25px; color: #333; line-height: 1.6; font-size: 15px;">
          <p style="margin-top: 0;">Dear Subscribers,</p>
          <p>${message}</p>
          <p style="margin-bottom: 0;">Best regards,<br><strong>The LBR Cleaning Team</strong></p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f5f5e4; padding: 15px; text-align: center; font-size: 13px; color: #666;">
          <p style="margin: 0;">© ${new Date().getFullYear()} LBR Cleaning. All rights reserved.</p>
        </div>
      </div>
    </div>
  `
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


