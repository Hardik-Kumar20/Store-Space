const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    userName : {
        type : String,
        reuired : true
    },
    password : {
        type : String,
        required : true
    }
} , {collection : "schemas"})

const login = mongoose.model('login' , loginSchema);
module.exports = login;