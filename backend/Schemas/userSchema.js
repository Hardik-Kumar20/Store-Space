const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userEmail :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps: true});

const user = mongoose.model('user', userSchema);
module.exports = user;