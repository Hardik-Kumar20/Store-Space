const express = require("express");
const mongoose = require("mongoose");
const Listing = require("../Schemas/listingScehma");
const Booking = require("../Schemas/bookingSchema");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// GET HOST DASHBOARD
router.get("/", authenticate, async (req, res) => {
  try {

    const userId = req.user.id;

    // 1️⃣ Get host listings
    const listings = await Listing.find({ owner: userId });

    const listingIds = listings.map(l => l._id);

    // 2️⃣ Active bookings (pending + confirmed)
    const activeBookings = await Booking.countDocuments({
      listingOwner: userId,
      status: { $in: ["pending", "confirmed"] }
    });

    // 3️⃣ Total earnings
    const earningsData = await Booking.aggregate([
      {
        $match: {
          listingOwner: new mongoose.Types.ObjectId(userId),
          status: "completed"
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$totalPrice" }
        }
      }
    ]);

    const totalEarnings = earningsData[0]?.totalEarnings || 0;

    // 4️⃣ Count bookings per listing
    const bookingStats = await Booking.aggregate([
      {
        $match: {
          listing: { $in: listingIds }
        }
      },
      {
        $group: {
          _id: "$listing",
          bookings: { $sum: 1 }
        }
      }
    ]);

    const bookingMap = {};
    bookingStats.forEach(b => {
      bookingMap[b._id] = b.bookings;
    });

    // 5️⃣ Simplified listing response
    const simplifiedListings = listings.map(listing => ({
      _id: listing._id,
      title: listing.title,
      pricePerDay: listing.pricePerDay,
      approvalStatus: listing.approvalStatus,
      bookings: bookingMap[listing._id] || 0
    }));

    res.json({
      stats: {
        id: userId,
        totalListings: listings.length,
        activeBookings,
        totalEarnings
      },
      listings: simplifiedListings
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




router.patch("/:id", authenticate, async (req, res) => {
  try {

    const { status } = req.body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.listingOwner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking updated", booking });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;