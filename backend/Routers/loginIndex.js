const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken');
const UserModel = require('../Schemas/loginSchema')
const loginRouter = express.Router();
loginRouter.use(bodyParser.json());

loginRouter.get('/' , (req , res)=>{
    res.send('Hi from login backend router');
})


//accept the data from the body of front end 
loginRouter.post('/login' , async (res , req)=>{
   try {
    const{userName , password , role} = req.body;
    console.log(username , password , role);

    const existingUser = await UserModel.findOne({userName});
    if(!existingUser){
        res.status(401).json('Username not found')
    }


    const isPasswordCorrect = await bcrypt.compare(password , existingUser.password)
    if(!isPasswordCorrect){
        res.status(401).json('Password is Incorrect');
    }
    
    // decision to take him to dashboard or Search page
    if(role.isEqual("Host") || role.isEqual("host")){
        // take him to dashboard
    }
    if(role.isEqual("Client") || role.isEqual("client")){
        // take him to search area
    }

   } catch (error) {
    res.status(500).json({message : error.message});
   }
})




module.exports = loginRouter;