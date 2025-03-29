const express = require("express")
const cors = require("cors")
const app = express()
const nodemailer = require("nodemailer")
const appPassword = "yvil cmib rtwc mfzl"


//usecase
app.use(express.json())
app.use(cors())


//create transporter
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"sundayudoh383@gmail.com",
    pass:appPassword
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

//i am listening
app.listen(5100, ()=>{
    console.log("currently runnig on port 5100.....")
})