const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../Schemas/signupSchema');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken');
const signupRouter = express.Router();

//middleware to access the data sent in form of json
signupRouter.use(bodyParser.json());

signupRouter.get('/' , (req , res)=>{
    res.status(200).json('hi from Signup Router');
})

// signup router for accepting and checking the data for user verification

signupRouter.post('/signup' , async (req , res)=>{
    try {
        const{userName , email , password} = req.body;
    const isExistingUser = await UserModel.findOne({userName});
    if(isExistingUser){
        res.send("Username Already Exist use other one.");
    }
    const isEmail = await UserModel.findOne({email});
    if(isEmail){
        res.status(401).json('Email already exist');
    }

    // hashing of password 
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password , salt);
    
    // saving new hashed password in the database through schema
    const newSchema = new UserModel({
        userName,
        email,
        password : hashPass
    })
        await newSchema.save();
        res.status(200).json({message : 'User created successfully.'})
        console.log(newSchema);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})


module.exports = signupRouter;