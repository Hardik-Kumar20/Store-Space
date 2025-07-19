const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const Schema = mongoose.model('Schema' , signupSchema);
module.exports = Schema;
