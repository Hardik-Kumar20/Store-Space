import express from "express";
import Listing from "../Schemas/listingSchema.js";
import Booking from "../Schemas/bookingSchema.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

// Create booking
router.post("/", authenticate, async (req, res) => {
  try {
    const { listingId, startDate, endDate } = req.body;

    if (!listingId || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.approvalStatus !== "approved") {
      return res.status(400).json({ message: "Listing not available" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    if (start >= end) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Check conflicts
    const conflictingBooking = await Booking.findOne({
      listing: listing._id,
      status: { $in: ["pending", "confirmed"] },
      startDate: { $lt: end },
      endDate: { $gt: start },
    });

    if (conflictingBooking) {
      return res.status(400).json({
        message: "This listing is already booked for selected dates",
      });
    }

    // Calculate price
    const days = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    );

    const totalPrice = days * listing.pricePerDay;

    const booking = await Booking.create({
      listing: listing._id,
      listingOwner: listing.owner,
      customer: req.user.id,
      startDate: start,
      endDate: end,
      totalPrice,
      status: "pending",
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// User bookings
router.get("/my-bookings", authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate({
        path: "listing",
        select: "title pricePerDay images address city state",
      })
      .populate({
        path: "listingOwner",
        select: "userName userEmail",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Host bookings
router.get("/host", authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({
      listingOwner: req.user.id,
    })
      .populate("listing", "title pricePerDay")
      .populate("customer", "userName userEmail")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;