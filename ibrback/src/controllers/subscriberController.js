require("dotenv").config();
const { createTransporter } = require("../config/mailer");
const { repositories } = require("../repositories");

const { subscriberRepository } = repositories;
const transporter = createTransporter();

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[A-Za-z0-9%._+-]{2,}@[A-Za-z0-9\-]{2,}\.[A-Za-z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const existing = await subscriberRepository.findByEmail(email);
    if (existing) {
      if (!existing.isActive) {
        await subscriberRepository.update(existing.id, { isActive: true, unsubscribedAt: null });
        return res.status(200).json({ success: true, message: "Subscription reactivated!" });
      }
      return res.status(400).json({ success: false, message: "Email already subscribed." });
    }

    const newSubscriber = await subscriberRepository.create({ email });

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

exports.getAllSubscribers = async (req, res) => {
  try {
    const allSubscribers = await subscriberRepository.findAll({
      orderBy: { subscribedAt: "desc" },
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

// adminLogin moved to src/controllers/authController.js — it's now backed
// by the User collection/table (with bcrypt + JWT) instead of a hardcoded
// env-var password, so it lives with the rest of the auth logic.

exports.sendMessage = async (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === "") {
    return res.status(400).json({ success: false, message: "Message cannot be empty" });
  }
  try {
    const subscribers = await subscriberRepository.findActive();
    if (subscribers.length === 0) {
      return res.status(401).json({ success: false, message: "There are no subscribers to send message to" });
    }

    let sentCount = 0;
    let failCount = 0;

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

exports.unSubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const subscriber = await subscriberRepository.findByEmail(email);
    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }

    await subscriberRepository.unsubscribe(subscriber.id);

    return res.status(200).json({ success: true, message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to unsubscribe",
    });
  }
};

exports.deleteAllSubscribers = async (req, res) => {
  try {
    const result = await subscriberRepository.deleteAll();
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
