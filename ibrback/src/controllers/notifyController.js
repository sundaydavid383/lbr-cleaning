// filepath: ibrback/src/controllers/notifyController.js
const Subscriber = require('../models/subscriber');
const { createTransporter } = require('../config/mailer');
require("dotenv").config();

/**
 * Send notification to all subscribers
 */
exports.SendNotification = async (req, res) => {
  const transporter = createTransporter();

  const { message } = req.body;

  if (!message || message.trim().length < 5) {
    return res.status(400).json({ success: false, message: "Message cannot be empty" });
  }

  try {
    // Get only active subscribers
    const subscribers = await Subscriber.findActive();

    if (subscribers.length === 0) {
      return res.status(404).json({ success: false, message: "No subscribers found" });
    }

<<<<<<< HEAD:ibrback/src/controllers/notifyController.js
    const mailOptions = {
      from: `"LBR Cleaning" <${process.env.SMTP_USER}>`,
      to: subscribers.map((e) => e.email).join(","), // all subscribers
      subject: "New Notification from LBR Cleaning",
      html: `
=======
 const mailOptions = { 
  from: "LBR Cleaning",
  to: emails.map((e) => e.email).join(","), // all subscribers
  subject: "New Notification from LBR Cleaning",
  html: `
>>>>>>> ffd8f6b299daf1744d0ceb9c5b590e82cc51df61:ibrback/controllers/notifyController.js
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
  `,
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