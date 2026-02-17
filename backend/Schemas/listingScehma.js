// This Schema is used for Storing the details of store 
// 1. Name
// 2. Location of store
// 3. Size
// 4. availability


const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    approvalStatus: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "pending"
    }
  
  }, { timestamps: true });

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;