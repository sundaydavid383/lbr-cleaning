require("dotenv").config();
const nodemailer = require("nodemailer");
// const twilio = require("twilio"); // 🔒 Commented out for now

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// const twilioClient = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_TOKEN
// );

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message, whatsapp } = req.body;

    // ✅ Basic validation
    if (!name || !email || !subject || !message || !whatsapp) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // 📨 Email to YOU (admin)
    const adminMailOptions = {
      from: "LBR Cleaning AGENT",
      to: process.env.SMTP_USER,
      subject: `Contact Form: ${subject}`,
      text: `📥 New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    };

    // 📧 Confirmation Email to USER
    const userMailOptions = {
      from: `"LBR Cleaning" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for contacting LBR Cleaning!`,
      text: `Hi ${name},\n\nThank you for reaching out to LBR Cleaning. We’ve received your message and will get back to you shortly.\n\nHere’s what you sent:\nSubject: ${subject}\nMessage: ${message}\n\nBest regards,\nThe LBR Cleaning Team`,
    };

    // ✉️ Send Emails
    await mailTransporter.sendMail(adminMailOptions);
    await mailTransporter.sendMail(userMailOptions);

    // 📲 WhatsApp message to admin (commented out)
    /*
    const whatsappTextToAdmin = `📥 New Contact Form Submission:\n\n👤 Name: ${name}\n📧 Email: ${email}\n📱 WhatsApp: ${whatsapp}\n📝 Subject: ${subject}\n💬 Message: ${message}`;
    await twilioClient.messages.create({
      body: whatsappTextToAdmin,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.WHATSAPP_TO,
    });

    // ✅ WhatsApp confirmation to USER
    const whatsappTextToUser = `Hi ${name}, thank you for contacting *LBR Cleaning*! 💧\n\nWe received your message and will respond shortly.\n\nGod bless you! ✨`;
    await twilioClient.messages.create({
      body: whatsappTextToUser,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${whatsapp}`,
    });
    */

    res.status(200).json({ msg: "Form submitted successfully via email!" });
  } catch (error) {
    console.error("Contact Form Error:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};
