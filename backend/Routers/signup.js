import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import User from "../Schemas/userSchema.js";

dotenv.config();

const signupRouter = express.Router();

// Test route
signupRouter.get("/", (req, res) => {
  res.status(200).json("hi from Signup Router");
});

// Register user
signupRouter.post("/register", async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;

    // Validation
    if (!userName || !userEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check username
    const isExistingUser = await User.findOne({ userName });
    if (isExistingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check email
    const isEmail = await User.findOne({ userEmail });
    if (isEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      userEmail,
      password: hashPass,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default signupRouter;