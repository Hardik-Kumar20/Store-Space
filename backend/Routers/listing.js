import express from "express";
import Listing from "../Schemas/listingSchema.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// CREATE DRAFT
router.post("/", authenticate, async (req, res) => {
  try {
    const existingDraft = await Listing.findOne({
      owner: req.user.id,
      approvalStatus: "draft",
    });

    if (existingDraft) {
      return res.status(200).json({
        message: "Draft already exists",
        listing: existingDraft,
      });
    }

    const listing = await Listing.create({
      owner: req.user.id,
      approvalStatus: "draft",
    });

    res.status(201).json({
      message: "Draft created successfully",
      listing,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET MY LISTINGS
router.get("/my", authenticate, async (req, res) => {
  try {
    const listings = await Listing.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE LISTING
router.patch("/:id", authenticate, upload.array("images", 5), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (listing.approvalStatus !== "draft") {
      return res.status(400).json({
        message: "Cannot edit this listing",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "type",
      "address",
      "city",
      "state",
      "zip",
      "size",
      "temperatureControlled",
      "securityCameras",
      "access24hr",
      "pricePerDay",
      "negotiable",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        listing[field] = req.body[field];
      }
    });

    // Upload images
    if (req.files && req.files.length > 0) {
      listing.images = req.files.map((file) => file.path);
    }

    await listing.save();

    res.json({
      message: "Listing updated successfully",
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// SUBMIT LISTING
router.patch("/submit/:id", authenticate, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (listing.approvalStatus !== "draft") {
      return res.status(400).json({
        message: "Listing cannot be submitted again",
      });
    }

    // Validation
    if (
      !listing.title ||
      !listing.description ||
      !listing.type ||
      !listing.address ||
      !listing.city ||
      !listing.state ||
      !listing.zip
    ) {
      return res.status(400).json({
        message: "Complete all required fields before submitting",
      });
    }

    if (listing.size == null || listing.size === "") {
      return res.status(400).json({ message: "Size is required" });
    }

    if (listing.pricePerDay == null || listing.pricePerDay <= 0) {
      return res.status(400).json({ message: "Valid price required" });
    }

    if (!listing.images || listing.images.length === 0) {
      return res.status(400).json({ message: "At least one image required" });
    }

    listing.approvalStatus = "pending";
    await listing.save();

    return res.json({ message: "Listing submitted for approval" });
  } catch (error) {
    console.error("SUBMIT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL LISTINGS
router.get("/", async (req, res) => {
  try {
    const { location, page = 1, minPrice, maxPrice, sort } = req.query;

    const filters = {
      approvalStatus: "approved",
    };

    if (location) {
      filters.$or = [
        { address: { $regex: location, $options: "i" } },
        { city: { $regex: location, $options: "i" } },
        { state: { $regex: location, $options: "i" } },
        { zip: { $regex: location, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      filters.pricePerDay = {};
      if (minPrice) filters.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filters.pricePerDay.$lte = Number(maxPrice);
    }

    const limit = 6;
    const skip = (Number(page) - 1) * limit;

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { pricePerDay: 1 };
    if (sort === "price_desc") sortOption = { pricePerDay: -1 };

    const listings = await Listing.find(filters)
      .populate("owner", "userName")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Listing.countDocuments(filters);

    res.json({
      listings,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

// GET SINGLE LISTING
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "owner",
      "userName"
    );

    if (!listing || listing.approvalStatus !== "approved") {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    console.error("Details Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;