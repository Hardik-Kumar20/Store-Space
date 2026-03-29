import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: email,
      subject: `Message from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return res.status(500).json({ message: "Error sending message" });
  }
});

export default router;