// filepath: ibrback/app.js
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { createTransporter } = require("./src/config/mailer");

// Import routes from src folder
const contactRoutes = require("./src/routes/contact");
const subscriberRouter = require("./src/routes/subscribe");
const notifyRoute = require("./src/routes/notify");
const paymentRoutes = require("./src/routes/payment");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});
app.use(limiter);

const transporter = createTransporter();

function capitalizeWord(word) {
<<<<<<< HEAD
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
=======
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
>>>>>>> ffd8f6b299daf1744d0ceb9c5b590e82cc51df61
}

const ApiResponse = (res, statusCode, success, data = null, message = "") => {
  const response = { success };
  if (data !== null) response.data = data;
  if (message) response.message = message;
  return res.status(statusCode).json(response);
};

<<<<<<< HEAD
// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error("Server Error:", err);
  return res.status(500).json({
    success: false,
    message: "An unexpected error occurred. Try connecting to the internet and try again.",
  });
};
=======
app.get('/welcome', (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Welcome to LBR Cleaning API" })
  }
  catch (err) {
    return res.status(500).json({ success: false, message: "An error occurred while processing your request" });
  }
})
>>>>>>> ffd8f6b299daf1744d0ceb9c5b590e82cc51df61

// Welcome endpoint
app.get("/welcome", (req, res) => {
  return ApiResponse(res, 200, true, null, "Welcome to LBR Cleaning API");
});

// Appointment booking endpoint
app.post("/appointments/book", async (req, res) => {
  console.log("---- NEW /appointments/book REQUEST ----");
  console.log("Raw req.body:", req.body);

  const { name, email, phone, service } = req.body;

  console.log("Extracted fields:", { name, email, phone, service });

  if (!name || !email || !phone || !service) {
<<<<<<< HEAD
    return ApiResponse(res, 400, false, "Invalid user data");
=======
    console.log("❌ Validation failed: Missing required fields");
    return res.status(400).json({ success: false, data: "Invalid user data" });
>>>>>>> ffd8f6b299daf1744d0ceb9c5b590e82cc51df61
  }

  console.log("✔ Validation passed");

  console.log("Splitting name...");
  const [firstName, lastName] = name.split(" ");
  console.log("Split result:", { firstName, lastName });

  const abbrivatedFirstName = capitalizeWord(firstName);
  const abbrivatedLastName = capitalizeWord(lastName);

  console.log("Capitalized names:", {
    abbrivatedFirstName,
    abbrivatedLastName,
  });

  console.log("Building sharedDetailsHTML...");
  const sharedDetailsHTML = `
    <table style="width:100%; border-collapse: collapse; font-family: Arial, sans-serif; margin-top: 15px;">
      <tr>
        <td style="padding: 10px; font-weight: bold; background-color: rgb(187, 238, 187); color: rgb(8, 59, 8); width: 120px; border: 1px solid rgb(228, 222, 222);">Name</td>
        <td style="padding: 10px; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8); border: 1px solid rgb(228, 222, 222);">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; background-color: rgb(187, 238, 187); color: rgb(8, 59, 8); border: 1px solid rgb(228, 222, 222);">Email</td>
        <td style="padding: 10px; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8); border: 1px solid rgb(228, 222, 222);">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; background-color: rgb(187, 238, 187); color: rgb(8, 59, 8); border: 1px solid rgb(228, 222, 222);">Phone</td>
        <td style="padding: 10px; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8); border: 1px solid rgb(228, 222, 222);">${phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; background-color: rgb(187, 238, 187); color: rgb(8, 59, 8); border: 1px solid rgb(228, 222, 222);">Service</td>
        <td style="padding: 10px; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8); border: 1px solid rgb(228, 222, 222);">${service}</td>
      </tr>
    </table>
  `;
  console.log("sharedDetailsHTML created");

<<<<<<< HEAD
  const nameParts = name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const capitalizedFirstName = capitalizeWord(firstName);
  const capitalizedLastName = capitalizeWord(lastName);

=======
  console.log("Preparing userMailOptions...");
>>>>>>> ffd8f6b299daf1744d0ceb9c5b590e82cc51df61
  const userMailOptions = {
    from: `"LBR Cleaning" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Appointment Confirmation - LBR Cleaning",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5e4; color: rgb(8, 59, 8); padding: 0; margin: 0;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0px 0px 15px 4px rgba(34, 34, 34, 0.2);">
          <div style="background-color: rgb(36, 170, 36); padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: white; font-size: 22px;">LBR Cleaning</h1>
            <p style="margin: 0; color: white; font-size: 14px;">Making your space shine ✨</p>
          </div>
          <div style="padding: 25px;">
            <h2 style="color: rgb(8, 92, 8); margin-top: 0;">Hello ${capitalizedFirstName} ${capitalizedLastName},</h2>
            <p style="line-height: 1.6;">Thank you for booking an appointment with <strong>LBR Cleaning</strong>! 🎉</p>
            <p style="line-height: 1.6;">Here are the details of your request:</p>
            ${sharedDetailsHTML}
            <p style="margin-top: 20px; line-height: 1.6;">
<<<<<<< HEAD
              We'll reach out shortly to confirm and schedule your service.  
              If you have any questions, feel free to reply to this email.
=======
              We’ll reach out shortly to confirm and schedule your service.  
>>>>>>> ffd8f6b299daf1744d0ceb9c5b590e82cc51df61
            </p>
            <div style="text-align: center; margin-top: 25px;">
              <a href="mailto:lbrcleaningservices16@gmail.com" style="background-color: rgb(36, 170, 36); color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; display: inline-block;">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
  };
  console.log("userMailOptions prepared:", userMailOptions);

<<<<<<< HEAD
  const ownerMailOptions = {
    from: `"LBR Cleaning" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL || process.env.SMTP_USER,
=======
  console.log("Preparing ownerMailOptions...");
  const ownerMailOptions = {
    from: '"LBR Cleaning" <sundayudoh383@gmail.com>',
    to: "sundayudoh383@gmail.com",
>>>>>>> ffd8f6b299daf1744d0ceb9c5b590e82cc51df61
    subject: "📩 New Appointment Booking - LBR Cleaning",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
        <h2 style="color: rgb(8, 92, 8);">New Appointment Received</h2>
        <p>You have a new appointment booking with the following details:</p>
        ${sharedDetailsHTML}
      </div>
    `,
  };
  console.log("ownerMailOptions prepared:", ownerMailOptions);

  try {
    console.log("Attempting to send user email...");
    await transporter.sendMail(userMailOptions);
    console.log("✔ User email sent successfully");

<<<<<<< HEAD
    return ApiResponse(res, 200, true, "Enquiry sent. We'll contact you soon.");
  } catch (error) {
    console.error("An error occurred:", error.message);
    return ApiResponse(res, 500, false, "An unexpected error occurred. Try connecting to the internet and try again.");
=======
    console.log("Attempting to send owner email...");
    await transporter.sendMail(ownerMailOptions);
    console.log("✔ Owner email sent successfully");

    console.log("---- REQUEST COMPLETED SUCCESSFULLY ----");
    return res.status(200).json({ success: true, data: "Enquiry sent. We’ll contact you soon." });

  } catch (error) {
    console.error("❌ ERROR sending email:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    return res.status(500).json({
      success: false,
      data: "An unexpected error occurred. Try connecting to the internet and try again."
    });
>>>>>>> ffd8f6b299daf1744d0ceb9c5b590e82cc51df61
  }
});

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api", subscriberRouter);
app.use("/api", notifyRoute);
app.use("/api/payment", paymentRoutes);

// Error handler (must be after all routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ PostgreSQL database ready (configure DATABASE_URL in .env)`);
});

module.exports = app;
