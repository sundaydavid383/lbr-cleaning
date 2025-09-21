const EmailModel = require("../models/subscriber");
const nodemailer = require("nodemailer");
const { subscribe } = require("../routes/contact");
//create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sundayudoh383@gmail.com",
    pass: process.env.APPPASSWORD || "NO appPassword" // Use environment variable or fallback to hardcoded password
  },
  pool: true
})

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[A-Za-z0-9%._+-]{2,}@[A-Za-z0-9\-]{2,}\.[A-Za-z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // TODO: Save email to database or file
    console.log("New subscription:", email);

    // Check if email already exists
    const existing = await EmailModel.findOne({ email });
    if (existing) {
      console.log("Email already subscribed:", email);
      return res.status(400).json({ success: false, message: "Email already subscribed." });
    }

    const newSubscriber = await EmailModel.create({ email });
    const mailOptions = {
      from: '"LBR Cleaning" <sundayudoh383@gmail.com"',
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
          `};
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
}

exports.getAllSubscribers = async (req, res) => {
  try {
    const allSubscribers = await EmailModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: allSubscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers",
    });
  }
}


let wrongAttempt = 0;

exports.adminLogin = async (req, res) => {
  const { password, disabled } = req.body;
  console.log("Admin login attempt with password:", password);

  // If the input is not disabled, reset wrongAttempt
  if (!disabled && wrongAttempt >= 5 ) {
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
        message: "Too many failed attempts, please try again later"
      });
    }

    return res.status(401).json({
      success: false,
      message: `Invalid password. You only have ${5 - wrongAttempt} attempts left.`
    });
  }

  // ✅ Correct password
  wrongAttempt = 0;
  console.log("Admin login successful");
  return res.status(200).json({ success: true, message: "Login successful" });
};


exports.sendMessage = async (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === "") {
    console.log("message field is empty")
    return res.status(400).json({ success: false, message: "Message cannot be empty" });
  }
  try {
    const subscribers = await EmailModel.find({}, "email");
    if (subscribers.length === 0) {
      console.log("there are no subscribers");
      return res.status(401).json({ success: false, message: "There are no subscribers to send message to" });
    }

    console.log("Sending message to subscribers:", subscribers.length);
    
     let sentCount = 0;
     let failCount = 0;
    
    //Loop through subscribers 
    for (let sub of subscribers) {
      const email = sub.email;
      console.log(`📤 Preparing mail for: ${email}`);


  const mailOptions = {
  from: '"LBR Cleaning"',
  to: email,
  subject: "Message from LBR Cleaning",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; background: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        
        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">LBR Cleaning</h2>
        
        <p style="font-size: 16px; color: #333;">Dear Subscriber,</p>
        
        <p style="font-size: 15px; color: #555;">
          ${message}
        </p>
        
        <p style="font-size: 15px; color: #333; margin-top: 20px;">
          Thank you for trusting <strong>LBR Cleaning</strong>.  
          <br>
          We look forward to serving you!
        </p>
        

        <p>If you wish to unsubscribe, please click <a href="https://lbr-cleaning-1.onrender.com/api/unsubscribe/${encodeURIComponent(email)}">here</a>.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        
        <p style="font-size: 13px; color: #777; text-align: center;">
          © ${new Date().getFullYear()} LBR Cleaning. All rights reserved.
        </p>
      </div>
    </div>
  `
};
  try {
    await transporter.sendMail(mailOptions);
    console.log("Message sent to:", email);
    sentCount++;
  } catch (error) {
    console.error("Error sending to:", email, error);
    failCount++;
  }
}
    res.status(200).json({ success: true, message: `Finished sending. success: ${sentCount}, failed: ${failCount}` });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ success: false, message: "Failed to send message" });

  }

}

// unsubscribe function (not in use)
exports.unSubscribe = async (req, res) => {
  console.log("👉 Entered unSubscribe function");
  
  const { email } = req.params;
  console.log("📩 Request body received:", req.body);

  try {
    if (!email) {
      console.log("⚠️ No email provided in request body");
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    console.log("🔍 Checking for email in DB:", email);
    const deleted = await EmailModel.findOneAndDelete({ email });

    if (deleted) {
      console.log("✅ Email found and deleted:", deleted.email);
      return res.status(200).json({
        success: true,
        message: "You have been unsubscribed successfully",
      });
    } else {
      console.log("❌ Email not found in DB:", email);
      return res.status(404).json({
        success: false,
        message: "Email not found in our subscriber list",
      });
    }
  } catch (err) {
    console.error("💥 Error in unsubscribe function:", err.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

exports.deleteAllSubscribers = async (req, res) => {
  try {
    console.log("Deleting all subscribers...");
    const result = await EmailModel.deleteMany({})
    console.log(`Deleted ${result.deletedCount} subscribers.`);
    res.status(200).json({ success: true, message: `Deleted ${result.deletedCount} subscribers.` });
  }
  catch (error) {
    console.error("Error deleting subscribers:", error);
    res.status(500).json({ success: false, message: "Failed to delete subscribers" });
    
  }
}