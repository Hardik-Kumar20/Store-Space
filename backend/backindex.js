const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const userModel = require("./Schemas/userSchema");

const app = express();
const signup = require("./Routers/signup");
const login = require("./Routers/loginIndex");
const logout = require("./Routers/logout");
const autoComplete = require("./Routers/mainPage");
const contact = require("./Routers/contact");
const dashboard = require("./Routers/dashboard")
const listings = require("./Routers/listing");
const authMiddleware = require("./middleware/authMiddleware")
const db = require ("./db");
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//Connecting to DataBase
db();

//Signup 
app.use('/api/signup', signup);

//Login
app.use('/api/login', login);

//searchBar autocomplete
app.use('/api/autoComplete', autoComplete);

// Logout
app.use("/api/logout", logout);

// Contact
app.use("/api/contact", contact);

//Dashboard
app.use("/api/dashboard", dashboard)

//listings
app.use("/api/listings", listings);


// (/me) route
app.get("/api/me", authMiddleware, async (req, res)=>{
    try{
        const user = await userModel.findById(req.user.id).select("-password");
        
        res.json({
            id: user._id,
            userName: user.userName,
            role: user.role,
            hostRequestStatus: user.hostRequestStatus
        });
    }catch(error){
        res.status(500).json({message: "server error"});
    }
});

//example api check
app.get('/', (req, res)=>{
    res.send("Hi from backindex api ");
})

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})