const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();
const signup = require("./Routers/signup");
const login = require("./Routers/loginIndex");
const db = require ("./db");
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

//Connecting to DataBase
db();

//Signup 
app.use('/signup', signup);

//Login
app.use('/login', login);

//main api check
app.get('/', (req, res)=>{
    res.send("Hi from backindex api ");
})

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})