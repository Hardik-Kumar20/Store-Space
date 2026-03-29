import express from "express";
import Listing from "../Schemas/listingSchema.js";
import { unavailableListingIds } from "./availability.js";

const mainPageRouter = express.Router();

// Autocomplete suggestions
mainPageRouter.get("/search", async (req, res) => {
  try {
    const location = req.query.text;

    if (!location) {
      return res.status(400).json({ message: "Query text is required" });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "API key not configured" });
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      location
    )}&limit=5&filter=countrycode:us&types=city,state,locality,address&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geoapify error: ${response.status}`);
    }

    const data = await response.json();

    const results = data.features.map(
      (f) => f.properties.formatted || ""
    );

    res.json({ results });
  } catch (error) {
    console.log("Autocomplete error:", error.message);
    res.status(500).json({ message: "Failed to fetch autocomplete results" });
  }
});

// Search results
mainPageRouter.get("/result", async (req, res) => {
  try {
    const { location, checkin, checkout, size } = req.query;

    if (!location || !checkin || !checkout || !size) {
      return res.status(400).json({ message: "Missing params" });
    }

    const startDate = new Date(checkin);
    const endDate = new Date(checkout);

    if (startDate >= endDate) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Get unavailable listings
    const unavailableIds = await unavailableListingIds(
      startDate,
      endDate
    );

    const filters = {
      approvalStatus: "approved",
      _id: { $nin: unavailableIds },

      // 🔥 FIXED (you had wrong field earlier)
      city: { $regex: location, $options: "i" },

      size: size,
    };

    const listings = await Listing.find(filters);

    res.json(listings);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default mainPageRouter;