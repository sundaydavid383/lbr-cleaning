require("dotenv").config();
const { createTransporter } = require("../config/mailer");

const mailTransporter = createTransporter();

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message, whatsapp } = req.body;

    if (!name || !email || !subject || !message || !whatsapp) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const adminMailOptions = {
      from: "LBR Cleaning AGENT",
      to: process.env.SMTP_USER,
      subject: `Contact Form: ${subject}`,
      text: `📥 New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    };

    const userMailOptions = {
      from: `"LBR Cleaning" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for contacting LBR Cleaning!`,
      text: `Hi ${name},\n\nThank you for reaching out to LBR Cleaning. We've received your message and will get back to you shortly.\n\nHere's what you sent:\nSubject: ${subject}\nMessage: ${message}\n\nBest regards,\nThe LBR Cleaning Team`,
    };

    await mailTransporter.sendMail(adminMailOptions);
    await mailTransporter.sendMail(userMailOptions);

    res.status(200).json({ msg: "Form submitted successfully via email!" });
  } catch (error) {
    console.error("Contact Form Error:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};
