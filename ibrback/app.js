const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const nodemailer = require("nodemailer")
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const contactRoutes = require("./routes/contact");


//usecase
app.use(express.json())
app.use(cors())
app.use(helmet());



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});
app.use(limiter);

const OWNER_EMAIL = process.env.SMTP_USER;
//create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sundayudoh383@gmail.com",
    pass: process.env.APPPASSWORD || "NO appPassword" // Use environment variable or fallback to hardcoded password
  },
  pool: true
})


app.get('/welcome', (req, res)=>{
  try{
    return res.status(200).json({ success: true, message: "Welcome to LBR Cleaning API" })
  }
  catch(err){
    return res.status(500).json({ success: false, message: "An error occurred while processing your request" });
  }
})

  //endpoint
app.post("/appointments/book", async (req, res) => {
  console.log(req.body)
  const { name, email, phone, service } = req.body

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ success: false, data: "Invalid user data" })
  }
  const sharedDetailsHTML = `
  <table style="width:100%; border-collapse: collapse; font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 8px; font-weight: bold; background-color: rgb(187, 238, 187); color: rgb(8, 59, 8);">Name:</td>
      <td style="padding: 8px; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8);">${name}</td>
    </tr>
    <tr>
      <td style="padding: 8px; font-weight: bold; background-color: rgb(187, 238, 187); color: rgb(8, 59, 8);">Email:</td>
      <td style="padding: 8px; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8);">${email}</td>
    </tr>
    <tr>
      <td style="padding: 8px; font-weight: bold; background-color: rgb(187, 238, 187); color: rgb(8, 59, 8);">Phone:</td>
      <td style="padding: 8px; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8);">${phone}</td>
    </tr>
    <tr>
      <td style="padding: 8px; font-weight: bold; background-color: rgb(187, 238, 187); color: rgb(8, 59, 8);">Service:</td>
      <td style="padding: 8px; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8);">${service}</td>
    </tr>
  </table>
`;

// Email to the customer
const userMailOptions = {
  from: '"LBR Cleaning" <sundayudoh383@gmail.com>',
  to: email,
  subject: "Appointment Confirmation - LBR Cleaning",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8); padding: 20px; border-radius: 10px; box-shadow: 0px 0px 15px 4px rgba(34, 34, 34, 0.4);">
      <h2 style="color: rgb(36, 170, 36);">Hello ${name},</h2>
      <p>Thank you for booking an appointment with <strong>LBR Cleaning</strong>!</p>
      <p>Here are the details of your request:</p>
      ${sharedDetailsHTML}
      <p>We will reach out shortly to confirm and schedule your service.</p>
      <p>If you have any questions, feel free to reply to this email.</p>
      <br>
      <p style="color: rgb(8, 92, 8, 0.8);">Best regards,<br>
      <strong>The LBR Cleaning Team</strong></p>
    </div>
  `,
};

// Email to the owner
const ownerMailOptions = {
  from: '"LBR Cleaning Alerts" <sundayudoh383@gmail.com>',
  to: OWNER_EMAIL,
  subject: "New Appointment Booking",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: rgb(245, 245, 228); color: rgb(8, 59, 8); padding: 20px; border-radius: 10px; box-shadow: 0px 0px 15px 4px rgba(34, 34, 34, 0.4);">
      <h2 style="color: rgb(36, 170, 36);">Hello Admin,</h2>
      <p>A new cleaning appointment has been booked. Here are the details:</p>
      ${sharedDetailsHTML}
      <p>Please reach out to the customer as soon as possible.</p>
      <hr style="border: none; border-top: 1px solid rgb(189, 185, 185);">
      <p style="color: rgb(8, 92, 8, 0.8);">-- End of Message --</p>
    </div>
  `,
};

  try {
      await transporter.sendMail(userMailOptions);
      console.log("User email sent successfully");
      await transporter.sendMail(ownerMailOptions);
      console.log("Owner email sent successfully");
    return res.status(500).json({ success: true, data: "Enquiry sent. We’ll contact you soon." })
  } catch (error) {
    console.error("an error occured:", error.message)
    return res.status(500).json({ success: false, data: "an unexpected error occured try connecting to the internet and try again" })
  }
})



app.use("/api/contact", contactRoutes);



// Route to handle newsletter signup
const subscriberRouter = require("./routes/subscribe");
app.use("/api", subscriberRouter);

const notifyRoute = require("./routes/notify");
app.use("/api", notifyRoute);

//i am listening
async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected at: ${connection.connection.host}`);

    app.listen(process.env.PORT || 5100, () => {
      console.log("🚀 Server running on port 5100...");
    });

  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error}`);
  }
}

connectDB();