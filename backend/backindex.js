const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();
const signup = require("./Routers/signup");
const login = require("./Routers/loginIndex");
const autoComplete = require("./Routers/mainPage");
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
app.use('/signup', signup);

//Login
app.use('/login', login);

//searchBar autocomplete
app.use('/autoComplete', autoComplete);

// (/me) route
app.get("/me", authMiddleware, (req, res)=>{
    res.json({
        userId: req.user.userId
    });
});

//example api check
app.get('/', (req, res)=>{
    res.send("Hi from backindex api ");
})

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})