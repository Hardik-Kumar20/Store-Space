const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userEmail :{
        type : String,
        required : true
    },
    userPass : {
        type : String,
        required : true
    }
})

const Schema = mongoose.model('Schema' , signupSchema);
module.exports = Schema;
