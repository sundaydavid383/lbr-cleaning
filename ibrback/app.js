const express = require("express")
const cors = require("cors")
const app = express()


//usecase
app.use(express.json())
app.use(cors())


//create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sundayudoh383@gmail.com",
      pass: appPassword,
    },
    pool: true,
  });
  
  
  //endpoint
  app.post("/appointments/book", async (req, res) => {
    console.log("request body:", req.body);
    const { firstname, lastname, email, phone } = req.body;
    if (!firstname || !lastname || !email || !phone) {
      return res
        .status(400)
        .json({ success: false, data: "Invalid user credentials" });
    }
    //sunday or weekday
    const time = new Date().getHours()
    const day = new Date().getDay()
    const sundayOrWeekday = (day === 0 && time <=10)?"today":"on sunday"
  
    const mailOptions = {
     from: '"NewSprings Team" <sundayudoh383@gmail.com>',
     to: email,
     subject: "Welcome to NewSprings!",
     text: `Hello ${firstname} ${lastname},\n\n
  Welcome to NewSprings! We're excited to have you on board.\n\n
  Here's what you can do next:\n
  - Explore our platform and get familiar with the features.\n
  - Stay updated with our latest news and updates.\n
  - Reach out if you have any questions—we're here to help!\n
  - we would message you on ${email} or call ${phone} to reach out to you when neccessary!\n\n
  If you ever need assistance, feel free to reply to this email.\n\n
  Enjoy your journey with us!\n\n
  Best regards see you in church ${sundayOrWeekday},\n
  The NewSprings Team`
  };
  
  try {
     await transporter.sendMail(mailOptions)
     console.log("sent mail to user after creation")
     return res.status(200).json({ success: true, data: "sent email successfully"})
  } catch (error) {
     console.log("unable send mail to user after creation")
     return res.status(200).json({ success: false, data: "unable to send email"})
  }
  });

//i am listening
app.listen(5100, ()=>{
    console.log("currently runnig on port 5100.....")
})