const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require('../Schemas/loginSchema')
const loginRouter = express.Router();
require('dotenv').config();
loginRouter.use(bodyParser.json());

loginRouter.get('/' , (req , res)=>{
    res.send('Hi from login backend router');
})

//jwt secret key 
const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);
//accept the data from the body of front end 
loginRouter.post('/login' , async (req , res)=>{
    console.log("Request body:", req.body);
   try {
    const{userName , password } = req.body;
    console.log(userName , password );

    const existingUser = await UserModel.findOne({userName});
    if(!existingUser){
        return res.status(401).json('Username not found')
    }


    const isPasswordCorrect = await bcrypt.compare(password , existingUser.password)
    if(!isPasswordCorrect){
        return res.status(401).json('Password is Incorrect');
    }
    
    // JWT payload
    const payload = {
        userId : existingUser._id
    }
    // sign the token
    const token = jwt.sign(payload , jwtSecret , {expiresIn : '1d'});

    //send the token back 
    res.json({token});

   } catch (error) {
    res.status(500).json({message : error.message});
    console.log('log error: ' , error);
   }
})




module.exports = loginRouter;