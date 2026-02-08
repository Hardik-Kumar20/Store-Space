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
    password : {
        type : String,
        required : true
    }
}, {timestamps: true});

export default mongoose.model("User", signupSchema);