const EmailModel = require("../models/subscriber");
const nodemailer = require("nodemailer")
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

    if (newSubscriber) {
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
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    console.log("Invalid admin password attempt");
    wrongAttempt += 1;
    if (wrongAttempt >= 5) {
      console.log("Too many failed attempts, locking out");
      return res.status(403).json({ success: false, inputDisable: true, message: "Too many failed attempts, please try again later" });
    }
    return res.status(401).json({ success: false, message: `Invalid password you only have ${5 - wrongAttempt}` });

  }
  console.log("Admin login successful");
  return res.status(401).json({ success: true, message: "Login successful" });
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
    const emails = subscribers.map(sub => sub.email);

    const mailOptions = {
      from: '"LBR Cleaning"',
      to: emails,
      subject: "Message from LBR Cleaning",
      text: `Dear Subscribers,${message}`
    };
    await transporter.sendMail(mailOptions);
    console.log("Message sent to all subscribers");
    res.status(200).json({ success: true, message: "Message sent to all subscribers" });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ success: false, message: "Failed to send message" });

  }

}