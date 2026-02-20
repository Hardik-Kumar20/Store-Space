const express = require("express");
const Listing = require("../Schemas/listingScehma");
const Booking = require("../Schemas/bookingSchema");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();



router.post("/:listingId", authenticate, async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
  
      const listing = await Listing.findById(req.params.listingId);
  
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
  
      if (listing.approvalStatus !== "approved") {
        return res.status(400).json({ message: "Listing not available" });
      }
  
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      if (start >= end) {
        return res.status(400).json({ message: "Invalid date range" });
      }
  
      // 🔥 CONFLICT CHECK
      const conflictingBooking = await Booking.findOne({
        listing: listing._id,
        status: "active",
        startDate: { $lt: end },   // existing start < new end
        endDate: { $gt: start }    // existing end > new start
      });
  
      if (conflictingBooking) {
        return res.status(400).json({
          message: "This listing is already booked for selected dates"
        });
      }
  
      // Calculate number of days
      const diffTime = end - start;
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      const totalPrice = days * listing.price;
  
      const booking = await Booking.create({
        listing: listing._id,
        listingOwner: listing.owner,
        customer: req.user.id,
        startDate: start,
        endDate: end,
        totalPrice
      });
  
      res.status(201).json({
        message: "Booking created successfully",
        booking
      });
  
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  module.exports = router;