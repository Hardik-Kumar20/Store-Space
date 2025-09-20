// routes/availabilityRoutes.js
const express = require("express");
const router = express.Router();
const Availability = require("../Schemas/availabilitySchema"); // your schema
const authenticateJWT = require("../middleware/authMiddleware"); // JWT middleware

// Create availability for the logged-in user's listing
router.post("/availability", authenticateJWT, async (req, res) => {
  try {
    const { listingId, availableFrom, availableTill, minimumBookingDuration, blackoutDates } = req.body;

    if (!listingId || !availableFrom || !availableTill || !minimumBookingDuration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const availability = new Availability({
      listing: listingId, // Assuming you store which listing this availability belongs to
      availableFrom,
      availableTill,
      minimumBookingDuration,
      blackoutDates: blackoutDates || []
    });

    await availability.save();

    res.status(201).json({
      message: "Availability added successfully",
      availability
    });
  } catch (error) {
    console.error("Error adding availability:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
