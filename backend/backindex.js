const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();
require('./db');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');

const Port = process.env.PORT || 8000;
const app = express();

// Parse URL-encoded form data & JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use("/images",express.static(path.join(__dirname, '../Images')));
app.use('/Authentication/login', express.static(path.join(__dirname, '../frontend/Authentication/login')));
app.use('/Authentication/signUp', express.static(path.join(__dirname, '../frontend/Authentication/signUp')));

// Routers
const loginIndex = require('./Routers/loginIndex');
const signupIndex = require('./Routers/signupIndex');
const listing = require("./Routers/listing");
const availability = require("./Routers/availability");
const contact = require("./Routers/contact");
const mainPageRouter = require("./Routers/mainPage")
// api check 
app.get("/", (req, res) => {
    res.send("Api is working fine");
});

// Login and signup routes and listing routes
app.use("/login", loginIndex);
app.use("/signup", signupIndex);
app.use("/listing" , listing);
app.use("/availability" , availability);
app.use("/contact" , contact);
app.use("/mainpage" , mainPageRouter);

// Start server
app.listen(Port, (err) => {
    if(err){
        console.log("Error occurred: " + err);
    }
    console.log(`Server is listening on port ${Port}`);
});
