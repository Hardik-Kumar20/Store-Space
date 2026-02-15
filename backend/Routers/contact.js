const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require('dotenv').config();

router.post('/' , (req , res)=>{
    console.log(" Incoming contact request:", req.body);
    const {name , email , message} = req.body;

    // configure your email transporter
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL,
            pass : process.env.PASS
        }
    });

    const mailOptions = {
        from : process.env.EMAIL,
        to : process.env.EMAIL,
        replyTo : email,
        subject : `message from ${name}`,
        text : message
    }

    transporter.sendMail(mailOptions , (error , info)=>{
        if (error) {
            console.log(error);
            return res.status(500).json({message: 'Error sending message'});
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({message: 'Message sent successfully'});
        }
    })

})
console.log("message sent")

module.exports = router;
