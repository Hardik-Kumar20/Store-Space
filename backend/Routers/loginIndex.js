import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../Schemas/userSchema.js";

dotenv.config();

const loginRouter = express.Router();

// Health check
loginRouter.get("/", (req, res) => {
  res.send("Hi from login backend router");
});

// JWT Secret
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

// LOGIN ROUTE
loginRouter.post("/user", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ userName });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT payload
    const payload = {
      id: existingUser._id,
      role: existingUser.role,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // 🔥 changed (important for frontend)
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      message: "Logged in successfully",
      user: {
        id: existingUser._id,
        userName: existingUser.userName,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default loginRouter;