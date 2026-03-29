import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    // Direct access to host without populating listing
    listingOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Index for faster date queries
bookingSchema.index({ listing: 1, startDate: 1, endDate: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;