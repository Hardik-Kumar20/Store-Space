const mongoose = require('mongoose');
const { checkout } = require('../Routers/contact');
const searchBarSchema = new mongoose.Schema({
    location : {
        type : String,
        required : true
    },
    checkin : {
        type : Date,
        required : true
    },
    checkout : {
        type : Date,
        required : true
    },
    size : {
        type : String,
        required : true
    }
}, {timestamps : true})
const mainPageSearchSchema = mongoose.model("mainPageSearchSchema" , searchBarSchema);
module.exports = mainPageSearchSchema;