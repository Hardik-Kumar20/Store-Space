const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require('../Schemas/signupSchema')
const loginRouter = express.Router();
require('dotenv').config();

loginRouter.get('/' , (req , res)=>{
    res.send('Hi from login backend router');
})

//jwt secret key 
const jwtSecret = process.env.JWT_SECRET;

//accept the data from the body of front end 
loginRouter.post('/user' , async (req , res)=>{
    console.log("Request body:", req.body);
   try {
    const{userName , password } = req.body;
    console.log(userName , password );

    const existingUser = await UserModel.findOne({userName});
    console.log("User from DB:", existingUser);
    if(!existingUser){
        return res.status(401).json('Username not found')
    }


    const isPasswordCorrect = await bcrypt.compare(password , existingUser.password)
    console.log("Password match:", isPasswordCorrect);
    if(!isPasswordCorrect){
        return res.status(401).json('Password is Incorrect');
    }
    
    // JWT payload
    const payload = {
        userId : existingUser._id
    }
    // sign the token
    const token = jwt.sign(payload , jwtSecret , {expiresIn : '1h'});

    //Store JWT In cookie 
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    });

    res.json({ message: "Logged in successfully" });

} catch (error) {
    res.status(500).json({message : error.message});
    console.log('log error: ' , error);
   }
})




module.exports = loginRouter;