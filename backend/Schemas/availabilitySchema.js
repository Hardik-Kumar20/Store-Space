import mongoose from "mongoose";

const avSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    availableTill: {
      type: Date,
      required: true,
    },
    minimumBookingDuration: {
      type: Number,
      required: true,
    },
    blackoutDates: [
      {
        type: Date,
      },
    ],
  },
  { timestamps: true }
);

const Availability = mongoose.model("Availability", avSchema);

export default Availability;