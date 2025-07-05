const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const nodemailer = require("nodemailer")
const EmailModel = require("./models/Subscriber");
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


//create transporter
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"sundayudoh383@gmail.com",
    pass:process.env.APPPASSWORD || "NO appPassword" // Use environment variable or fallback to hardcoded password
  },
  pool:true
})
  
  
  //endpoint
app.post("/appointments/book", async (req,res) => {
   console.log(req.body)
   const {name, email, phone, service} = req.body

   if(!name || !email || !phone ||!service){
    return res.status(400).json({success:false, data:"Invalid user data"})
   }

   const mailOption = {
    form:"from '<LBR cleaning>'",
    to:email,
    subject:"Welcome to LBR cleaning",
    text: `Dear Valued Customer,\n\n
    Thank you for choosing LBR Cleaning! We are excited to help keep your space spotless and fresh.\n\n
    If this is your first time booking with us, welcome! We are committed to providing top-quality cleaning services tailored to your needs. Your satisfaction is our priority.\n\n
    If you're a returning customer, we truly appreciate your trust in us. We’re thrilled to continue serving you and making your home or workspace shine.\n\n
    Need assistance or have special requests? Feel free to reply to this email or contact our support team.\n\n
    We look forward to serving you!\n\n
    Best regards,\n
    The LBR Cleaning Team`
   }

   try {
       transporter.sendMail(mailOption)
       return res.status(500).json({success:true, data:"successfully send email to user"}) 
   } catch (error) {
      console.error("an error occured:", error.message)
      return res.status(500).json({success:false, data:"an unexpected error occured try connecting to the internet and try again"})
   }
})



app.use("/api/contact", contactRoutes);



// Route to handle newsletter signup
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[A-Za-z0-9%._+-]{2,}@[A-Za-z0-9\-]{2,}\.[A-Za-z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // TODO: Save email to database or file
    console.log("New subscription:", email);
    
    // Check if email already exists
    const existing = await EmailModel.findOne({email});
    if(existing){
      console.log("Email already subscribed:", email);
      return res.status(400).json({ success: false, message: "Email already subscribed." });
    }

    const newSubscriber = await EmailModel.create({email});

    if (newSubscriber){
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
});

const notifyRoute = require("./routes/notify");
app.use(notifyRoute);

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