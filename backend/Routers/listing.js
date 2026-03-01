const express = require("express");
const Listing = require("../Schemas/listingScehma");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/upload");

const router = express.Router();



// POST /listings
router.post("/", authenticate, async (req, res) => {
  try {
    const listing = await Listing.create( {
      owner: req.user.id,
      approvalStatus: "draft",
    });

    const existingDraft = await Listing.findOne({
      owner: req.user.id,
      approvalStatus: "draft"
    });

    if(existingDraft){
      return res.status(400).json({
        message: "You already have a draft listing. Please complete or delete it before creating a new one.",
        listing: existingDraft
      })
    }
    res.status(201).json({
      message: "Draft created successfully",
      listing
    });
  }catch(error){
    res.status(500).json({ message: "Server error" }); }
})



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
router.patch("/:id", authenticate, upload.array('images', 5), async (req, res) => {
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
        message: "Cannot edit this listing"
      });
    }

    if (req.body.pricePerDay !== undefined) {
      const price = Number(req.body.pricePerDay);
    
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ message: "Invalid price" });
      }
    
      listing.pricePerDay = price;
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
      "negotiable"
    ]

    allowedFields.forEach(field => {
      if(req.body[field] !== undefined){
        listing[field] = req.body[field];
      }
    })

    // If images are uploaded, update them in the listing 
    if(req.files && req.files.length > 0){
      listing.images = req.files.map(file => file.path);
    }

    await listing.save();

    res.json({
      message: "Listing updated successfully",
      listing
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});





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
        message: "Listing cannot be submitted again"
      });
    }

    if (
      !listing.title ||
      !listing.description ||
      !listing.type ||
      !listing.address ||
      !listing.city ||
      !listing.state ||
      !listing.zip ||
      !listing.size ||
      !listing.pricePerDay ||
      !listing.images ||
      listing.images.length === 0
    ) {
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
      filters.city = {
        $regex: location,
        $options: "i"
      };
    }

    // price filter
    if(minPrice || maxPrice){
      filters.pricePerDay = {};
      if(minPrice) filters.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filters.pricePerDay.$lte = Number(maxPrice);
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
      if (sort === "price_asc") sortOption = { pricePerDay: 1 };
      if (sort === "price_desc") sortOption = { pricePerDay: -1 };
      if (sort === "newest") sortOption = { createdAt: -1 };

    let listings = await Listing.find(filters)
    .populate("owner", "userName")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

    const total = await Listing.countDocuments(filters);

    res.json({
      listings,
      totalPages : Math.ceil(total / limit),
      currentPage: Number(page)
    });

    } catch (error) {
      console.error(error);
      res.status(500).json({message: "server error"});
  }
});




module.exports = router;