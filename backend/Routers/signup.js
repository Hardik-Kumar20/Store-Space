const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../Schemas/userSchema');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken');
const signupRouter = express.Router();

//middleware to access the data sent in form of json
signupRouter.use(bodyParser.json());


// signup Router to check that signup file is responding...
signupRouter.get('/' , (req , res)=>{
    res.status(200).json('hi from Signup Router');
})


// signup router for accepting and checking the data for user verification

signupRouter.post('/register', async (req, res) => {
    try {
      const { userName, userEmail, password } = req.body;
  
      const isExistingUser = await UserModel.findOne({ userName });
      if (isExistingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
  
      const isEmail = await UserModel.findOne({ userEmail });
      if (isEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
  
      const newUser = new UserModel({
        userName,
        userEmail,
        password: hashPass
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully." });
      console.log(newUser);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  



module.exports = signupRouter;