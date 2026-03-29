import mongoose from "mongoose";

const searchBarSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    checkin: {
      type: Date,
      required: true,
    },
    checkout: {
      type: Date,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MainPageSearch = mongoose.model(
  "MainPageSearch",
  searchBarSchema
);

export default MainPageSearch;