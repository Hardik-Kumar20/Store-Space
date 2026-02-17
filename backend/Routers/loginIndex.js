const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require('../Schemas/userSchema')
const loginRouter = express.Router();
require('dotenv').config();

loginRouter.get('/' , (req , res)=>{
    res.send('Hi from login backend router');
})

//jwt secret key 
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}


//accept the data from the body of front end 
loginRouter.post('/user' , async (req , res)=>{
    console.log("Request body:", req.body);
   try {
    const{userName , password } = req.body;
    console.log(userName , password );

    const existingUser = await UserModel.findOne({userName});
    console.log("User from DB:", existingUser);
    if(!existingUser){
        return res.status(401).json({message : "Invalid credentials"});
    }


    const isPasswordCorrect = await bcrypt.compare(password , existingUser.password)
    console.log("Password match:", isPasswordCorrect);
    if(!isPasswordCorrect){
        return res.status(401).json({message : "Invalid credentials"});
    }
    
    // JWT payload
    const payload = {
        id : existingUser._id,
        role: existingUser.role
    }
    // sign the token
    const token = jwt.sign(payload, jwtSecret , {expiresIn : '1h'});

    //Store JWT In cookie 
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    });

    res.json({ message: "Logged in successfully",
        user: {
            id: existingUser._id,
            userName: existingUser.userName,
            role: existingUser.role
        }
     });

} catch (error) {
    res.status(500).json({message : error.message});
    console.log('log error: ' , error);
   }
})




module.exports = loginRouter;