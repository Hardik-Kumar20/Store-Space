const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken');
const login = require('../Schemas/loginSchema')
const loginRouter = express.Router();
router.use(bodyParser.json());

router.get('/' , (req , res)=>{
    res.send('Hi from login backend router');
})


//accept the data from the body of front end 
router.post('/login' , async (res , req)=>{
   try {
    const{userName , password} = req.body;
    console.log(username , password);

    const existingUser = await login.findOne({userName});
    if(!existingUser){
        res.status(401).json('Username not found')
    }


    const isPasswordCorrect = await bcrypt.compare(password , existingUser.password)
    if(!isPasswordCorrect){
        res.status(401).json('Password is Incorrect');
    }
    
   } catch (error) {
    
   }
})

module.exports = loginRouter;