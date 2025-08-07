const express = require ('express');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();
require('./db');
const mongoose = require('mongoose');
// const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser')
const Port = process.env.PORT || 8000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Static access on frontend folder
app.use('/Authentication/login', express.static(path.join(__dirname, '../frontend/Authentication/login')));
app.use('/Authentication/signUp', express.static(path.join(__dirname, '../frontend/Authentication/signUp')));





const loginIndex = require('./Routers/loginIndex');
const signupIndex = require('./Routers/signupIndex');




app.get("/" , (req , res)=>{
    res.send("Api is working fine");
})

//LoginIndex Api
app.use("/login" , loginIndex);

//signupIndex Api
app.use("/signup" , signupIndex);

// api for jsonwebtoken 









//listening port 
app.listen(Port , (err) => {
    if(err){
        console.log("error occured is: " + err);
    }
    console.log(`Server is listening on port ${Port}`)

})