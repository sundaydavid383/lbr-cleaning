const EmailModel = require("../models/subscriber");
const nodemailer = require("nodemailer");
require("dotenv").config()

exports.SendNotification = async (req, res) => {
    const transporter = nodemailer.createTransporter({
        service: "gmail",
        auth:{
            user:"sundayudoh383@gmail.com",
            password: process.env.APPPASSWORD || "NO appPassword" // Use environment variable or fallback to hardcoded password
        },
        pool: true
    }) 

    const {message} = req.body;

    // check if message is empty
    if (!message){
        console.error("empty message value, please provide a message to send to subscribers");
        return res.status(400).json({success: false, data: "Message cannot be empty"});
    }
    
     try {
        const emails = await EmailModel.find();

        if (emails.length === 0) {
            console.error("No subscribers found");
            return res.status(404).json({success: false, data: "No subscribers found"});
        }

        const mailOptions = {
            from:"from '<LBR cleaning>'",
            to: emails.map(email => email.email).join(","),
            subject: "New Notification from LBR Cleaning",
            text: `Dear Subscribers,\n\n${message}\n\nBest regards,\nThe LBR Cleaning Team`
        }

        await transporter.sendMail(mailOptions);
        console.log("Notification sent to all users");

}
   catch(error){
    console.log("an error occured while sending notification", error)
    return res.status(500).json({success: false, data: "An error occurred while sending notification", error: error.message});
   }
}


