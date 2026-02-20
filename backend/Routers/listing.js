const express = require("express");
const Listing = require("../Schemas/listingScehma");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/upload");

const router = express.Router();



// POST /listings
router.post("/", authenticate, upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.path);

    const listing = await Listing.create({
      owner: req.user.id,
      images: imageUrls,
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
    const {location, page=1, minPrice, maxPrice, size, sort} = req.query;
    
    const filters ={
      approvalStatus: "approved"
    };

    if(location){
      filters["location.city"] = {
        $regex: location,
        $options: "i"
      };
    }

    // price filter
    if(minPrice || maxPrice){
      filters.price = {};
      if(minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    // size filter
    if(size){
      filters.size = size;
    }


    // pagination setup 
    const limit = 6;
    const skip = (Number(page) - 1) * limit;

    // Sorting
    let sortOption = { createdAt: -1 };
      if (sort === "price_asc") sortOption = { price: 1 };
      if (sort === "price_desc") sortOption = { price: -1 };
      if (sort === "newest") sortOption = { createdAt: -1 };

    let Listings = await Listing.find(filters)
    .populate("owner", "userName")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

    const total = await Listing.countDocuments(filters);

    res.json({
      Listings,
      totalPages : Math.ceil(total / limit),
      currentPage: Number(page)
    });

    } catch (error) {
      console.error(error);
      res.status(500).json({message: "server error"});
  }
});




module.exports = router;