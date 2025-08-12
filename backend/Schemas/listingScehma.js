// This Schema is used for Storing the details of store 
// 1. Name
// 2. Location of store
// 3. Size
// 4. availability


const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true,
    },
    kindOf : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    area : {
        lenght : {
            type : Number,
            required : true
        },
        width : {
            type : Number,
            required : true
        },
        height : {
            type : Number,
            required : true
        },
        floor : {
            type : String,
            required : true
        },
        weight : {
            type : Number,
            required : true
        }
    },
    owner : {
        type : String,
        required : true
    }
})

const LSchema = mongoose.model("LSchema" , listingSchema);
module.exports = LSchema;