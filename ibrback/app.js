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


//endpoint
app.post("/appointments/book", async (req, res) => {
  console.log(req.body)
  const { name, email, phone, service } = req.body

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ success: false, data: "Invalid user data" })
  }
  const sharedDetails = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
`;

    // Email to the customer
  const userMailOptions = {
    from: '"LBR Cleaning" <sundayudoh383@gmail.com>',
    to: email,
    subject: "Appointment Confirmation - LBR Cleaning",
    text: `Dear ${name},

Thank you for booking an appointment with LBR Cleaning!

Here are the details of your request:
${sharedDetails}

We will reach out shortly to confirm and schedule your service.

If you have any questions, feel free to reply to this email.

Best regards,  
The LBR Cleaning Team
    `,
  };

  // Email to the owner
  const ownerMailOptions = {
    from: '"LBR Cleaning Alerts" <sundayudoh383@gmail.com>',
    to: OWNER_EMAIL,
    subject: "New Appointment Booking",
    text: `Hello Admin,

A new cleaning appointment has been booked. Here are the details:

${sharedDetails}

Please reach out to the customer as soon as possible.

-- End of Message --`,
  };

  try {
      await transporter.sendMail(userMailOptions);
      console.log("User email sent successfully");
      await transporter.sendMail(ownerMailOptions);
      console.log("Owner email sent successfully");
    return res.status(500).json({ success: true, data: "successfully send email to user" })
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