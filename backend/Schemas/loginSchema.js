const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    roles: {
        type: [String],
        default: ["client"]
      },
      primaryRole: {
        type: String,
        enum: ["host", "client"],
        default: "client"
      },
      createdAt : {
        type : Date,
        default : Date.now
      }
} , {collection : "schemas"})

const login = mongoose.model('login' , loginSchema);
module.exports = login;