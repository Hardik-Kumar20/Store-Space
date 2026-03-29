import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
    },

    pricePerDay: {
      type: Number,
    },

    size: {
      type: Number, // in sq ft
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    zip: {
      type: String,
    },

    temperatureControlled: {
      type: Boolean,
      default: false,
    },

    securityCameras: {
      type: Boolean,
      default: false,
    },

    access24hr: {
      type: Boolean,
      default: false,
    },

    images: [
      {
        type: String,
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    approvalStatus: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;