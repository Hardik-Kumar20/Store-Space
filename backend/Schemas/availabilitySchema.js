const mongoose = require("mongoose")
const avSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
      },
      availableFrom: {
        type: Date,
        required: true
      },
      availableTill: {
        type: Date,
        required: true
      },
      minimumBookingDuration: {
        type: Number,
        required: true
      },
      blackoutDates: [{
        type: Date
      }],
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    },
    { timestamps: true }
);

const Schema = mongoose.model("Schema" , avSchema);
module.exports = Schema;