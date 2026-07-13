// filepath: ibrback/src/controllers/subscriberController.js
require("dotenv").config();
const { createTransporter } = require("../config/mailer");
const Subscriber = require('../models/subscriber');

const transporter = createTransporter();

/**
 * Subscribe a new user
 */
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[A-Za-z0-9%._+-]{2,}@[A-Za-z0-9\-]{2,}\.[A-Za-z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Check if email already exists
    const existing = await Subscriber.findByEmail(email);
    if (existing) {
      if (!existing.isActive) {
        // Reactivate subscription
        await Subscriber.update(existing.id, { isActive: true, unsubscribedAt: null });
        return res.status(200).json({ success: true, message: "Subscription reactivated!" });
      }
      return res.status(400).json({ success: false, message: "Email already subscribed." });
    }

    // Create new subscriber
    const newSubscriber = await Subscriber.create({ email });

    const mailOptions = {
      from: `"LBR Cleaning" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Subscription Confirmation",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; background: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">LBR Cleaning</h2>
        <p style="font-size: 16px; color: #333;">Dear Subscriber,</p>
        <p style="font-size: 15px; color: #555;">
          Thank you for subscribing to our newsletter! We're excited to have you on board.
          You'll be the first to know about our latest updates, offers, and cleaning tips.
        </p>
        <p style="font-size: 15px; color: #333; margin-top: 20px;">
          Thank you for trusting <strong>LBR Cleaning</strong>.  
          <br>
          We look forward to serving you!
          </p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 13px; color: #777; text-align: center;">
          © ${new Date().getFullYear()} LBR Cleaning. All rights reserved.
          </p>
          </div>
          </div>
          `,
    };

    if (newSubscriber) {
      await transporter.sendMail(mailOptions);
      console.log("New subscriber added:", newSubscriber);
      return res.status(200).json({ success: true, message: "Subscription successful!" });
    }

  } catch (error) {
    console.error("Error in /api/subscribe:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

/**
 * Get all subscribers
 */
exports.getAllSubscribers = async (req, res) => {
  try {
    const allSubscribers = await Subscriber.findAll({
      orderBy: { subscribedAt: 'desc' },
    });
    res.status(200).json({ success: true, data: allSubscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers",
    });
  }
};

/**
 * Admin login
 */
let wrongAttempt = 0;

exports.adminLogin = async (req, res) => {
  const { password, disabled } = req.body;
  console.log("Admin login attempt with password:", password);

  // If the input is not disabled, reset wrongAttempt
  if (!disabled && wrongAttempt >= 5) {
    wrongAttempt = 0;
  }

  if (!password || password.trim() === "") {
    console.log("Password field is empty");
    return res.status(400).json({ success: false, message: "Password cannot be empty" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    wrongAttempt += 1;
    console.log(`Invalid password. wrongAttempt = ${wrongAttempt}`);

    if (wrongAttempt >= 5) {
      console.log("Too many failed attempts, locking out");
      return res.status(403).json({
        success: false,
        inputDisable: true,
        message: "Too many failed attempts, please try again later",
      });
    }

    return res.status(401).json({
      success: false,
      message: `Invalid password. You only have ${5 - wrongAttempt} attempts left.`,
    });
  }

  // ✅ Correct password
  wrongAttempt = 0;
  console.log("Admin login successful");
  return res.status(200).json({ success: true, message: "Login successful" });
};

/**
 * Send message to all subscribers
 */
exports.sendMessage = async (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === "") {
    console.log("message field is empty");
    return res.status(400).json({ success: false, message: "Message cannot be empty" });
  }
  try {
    const subscribers = await Subscriber.findActive();
    if (subscribers.length === 0) {
      console.log("there are no subscribers");
      return res.status(401).json({ success: false, message: "There are no subscribers to send message to" });
    }

    console.log("Sending message to subscribers:", subscribers.length);

    let sentCount = 0;
    let failCount = 0;

    // Loop through active subscribers
    for (let sub of subscribers) {
      const mailOptions = {
        from: `"LBR Cleaning" <${process.env.SMTP_USER}>`,
        to: sub.email,
        subject: "New Message from LBR Cleaning",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; background: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">LBR Cleaning</h2>
              <p style="font-size: 15px; color: #555;">${message}</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <p style="font-size: 13px; color: #777; text-align: center;">
              © ${new Date().getFullYear()} LBR Cleaning. All rights reserved.
              </p>
            </div>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        sentCount++;
      } catch (emailError) {
        console.error(`Failed to send to ${sub.email}:`, emailError);
        failCount++;
      }
    }

    console.log(`Message sent: ${sentCount} success, ${failCount} failed`);
    return res.status(200).json({
      success: true,
      message: `Message sent to ${sentCount} subscribers. ${failCount} failed.`,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

/**
 * Unsubscribe
 */
exports.unSubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const subscriber = await Subscriber.findByEmail(email);
    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }

    await Subscriber.unsubscribe(subscriber.id);

    return res.status(200).json({ success: true, message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to unsubscribe",
    });
  }
};

/**
 * Delete all subscribers (admin use)
 */
exports.deleteAllSubscribers = async (req, res) => {
  try {
    const result = await Subscriber.deleteAll();
    return res.status(200).json({
      success: true,
      message: `Deleted ${result.count} subscribers`,
    });
  } catch (error) {
    console.error("Error deleting subscribers:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete subscribers",
    });
  }
};