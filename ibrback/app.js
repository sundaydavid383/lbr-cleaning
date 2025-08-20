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
  }const sharedDetailsHTML = `
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

// Email to the customer
const userMailOptions = {
  from: '"LBR Cleaning" <sundayudoh383@gmail.com>',
  to: email,
  subject: "✨ Appointment Confirmation - LBR Cleaning ✨",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5e4; color: rgb(8, 59, 8); padding: 0; margin: 0;">
      <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0px 0px 15px 4px rgba(34, 34, 34, 0.2);">
        
        <!-- Header -->
        <div style="background-color: rgb(36, 170, 36); padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 22px;">LBR Cleaning</h1>
          <p style="margin: 0; color: white; font-size: 14px;">Making your space shine ✨</p>
        </div>

        <!-- Body -->
        <div style="padding: 25px;">
          <h2 style="color: rgb(8, 92, 8); margin-top: 0;">Hello ${name},</h2>
          <p style="line-height: 1.6;">Thank you for booking an appointment with <strong>LBR Cleaning</strong>! 🎉</p>
          <p style="line-height: 1.6;">Here are the details of your request:</p>
          
          ${sharedDetailsHTML}

          <p style="margin-top: 20px; line-height: 1.6;">We’ll reach out shortly to confirm and schedule your service.  
          If you have any questions, feel free to reply to this email.</p>

          <!-- Call to Action Button -->
          <div style="text-align: center; margin-top: 25px;">
            <a href="mailto:support@lbrcleaning.com" style="background-color: rgb(36, 170, 36); color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; display: inline-block;">
              Contact Support
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: rgb(245, 245, 228); padding: 15px; text-align: center; font-size: 13px; color: rgb(8, 92, 8, 0.8);">
          <p style="margin: 0;">Best regards,<br><strong>The LBR Cleaning Team</strong></p>
        </div>
      </div>
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