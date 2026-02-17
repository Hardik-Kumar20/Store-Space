const express = require("express");
const Listing = require("../Schemas/listingScehma");
const Booking = require("../Schemas/bookingSchema");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();


// GET /dashboard
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️ Get user's listings
    const listings = await Listing.find({ owner: userId });

    const listingIds = listings.map(listing => listing._id);

    // 2️ Active bookings count
    const activeBookings = await Booking.countDocuments({
      listing: { $in: listingIds },
      status: "active"
    });

    // 3️ Total earnings (sum of completed bookings)
    const earningsData = await Booking.aggregate([
      {
        $match: {
          listing: { $in: listingIds },
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

    // 4 Prepare simplified listings data
    const simplifiedListings = listings.map(listing => ({
      _id: listing._id,
      title: listing.title,
      pricePerDay: listing.price,
      approvalStatus: listing.approvalStatus
    }));

    res.json({
      stats: {
        totalListings: listings.length,
        activeBookings,
        totalEarnings
      },
      listings: simplifiedListings
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
