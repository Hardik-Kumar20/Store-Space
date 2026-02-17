const express = require("express");
const Listing = require("../models/Listing");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();



// POST /listings
router.post("/", authenticate, async (req, res) => {
  try {
    const listing = await Listing.create({
      owner: req.user.id,
      ...req.body,
      approvalStatus: "draft"
    });

    res.status(201).json({
      message: "Draft created successfully",
      listing
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// GET /listings/my
router.get("/my", authenticate, async (req, res) => {
  try {
    const listings = await Listing.find({
      owner: req.user.id
    }).sort({ createdAt: -1 });

    res.json(listings);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});




// PATCH /listings/:id
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (listing.approvalStatus === "approved") {
      return res.status(400).json({
        message: "Cannot edit approved listing"
      });
    }

    Object.assign(listing, req.body);

    await listing.save();

    res.json({
      message: "Listing updated successfully",
      listing
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});





// PATCH /listings/submit/:id
router.patch("/submit/:id", authenticate, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Validate required fields before submission
    if (!listing.title || !listing.description || !listing.price || !listing.location) {
      return res.status(400).json({
        message: "Complete all required fields before submitting"
      });
    }

    listing.approvalStatus = "pending";

    await listing.save();

    res.json({ message: "Listing submitted for approval" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// GET /listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({
      approvalStatus: "approved"
    })
      .populate("owner", "userName")
      .sort({ createdAt: -1 });

    res.json(listings);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;