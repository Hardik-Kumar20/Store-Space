// This Schema is used for Storing the details of store 
// 1. Name
// 2. Location of store
// 3. Size
// 4. availability


const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  pricePerDay: {
    type: Number,
    required: true
  },

  size: {
    type: Number,   // in sq ft
    required: true
  },

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  zip: {
    type: String,
    required: true
  },

  temperatureControlled: {
    type: Boolean,
    default: false
  },

  securityCameras: {
    type: Boolean,
    default: false
  },

  access24hr: {
    type: Boolean,
    default: false
  },

  images: [{
    type: String,
    required: true
  }],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  approvalStatus: {
    type: String,
    enum: ["draft", "pending", "approved", "rejected"],
    default: "draft"
  }

}, { timestamps: true });

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;