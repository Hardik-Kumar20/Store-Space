const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true
    },

    listingOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
