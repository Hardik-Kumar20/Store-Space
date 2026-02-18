const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true
    },
    // Using for scalability cause if user want to see the host we dont populate listings first to see his profile we can acess from this schema directly
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
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "active"
    }

  },
  { timestamps: true }
);

bookingSchema.index({ listing: 1, startDate: 1, endDate: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
