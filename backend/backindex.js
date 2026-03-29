import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import userModel from "./Schemas/userSchema.js";
import signup from "./Routers/signup.js";
import login from "./Routers/loginIndex.js";
import logout from "./Routers/logout.js";
import mainpage from "./Routers/mainPage.js";
import contact from "./Routers/contact.js";
import dashboard from "./Routers/dashboard.js";
import listings from "./Routers/listing.js";
import bookings from "./Routers/bookingRoute.js";
import admin from "./Routers/adminRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
import db from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: true, // important for Render
    credentials: true
}));

// DB
db();

// Routes
app.use('/api/signup', signup);
app.use('/api/login', login);
app.use('/api/mainpage', mainpage);
app.use("/api/logout", logout);
app.use("/api/contact", contact);
app.use("/api/dashboard", dashboard);
app.use("/api/listings", listings);
app.use("/api/bookings", bookings);
app.use("/api/admin", admin);

// /me route
app.get("/api/me", authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            id: user._id,
            userName: user.userName,
            role: user.role,
            hostRequestStatus: user.hostRequestStatus
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // if request is for API → skip
  if (req.path.startsWith("/api")) return next();

  // check if file exists (image, asset, etc.)
  const filePath = path.join(__dirname, "public", req.path);

  if (fs.existsSync(filePath)) {
    return next(); // let static serve it
  }

  // otherwise serve React app
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/debug-files", (req, res) => {
    const fs = require("fs");
    const files = fs.readdirSync(path.join(__dirname, "public"));
    res.json(files);
  });

// Test route
app.get('/api/test', (req, res) => {
    res.send("Backend working");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});