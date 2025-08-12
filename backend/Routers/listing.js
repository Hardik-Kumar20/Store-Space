const express = require('express');
const router = express.Router();
const Listing = require('../Schemas/listingScehma'); 
const authenticateJWT = require('../middleware/authMiddleware');

// Create a new listing (POST /listings)
router.post('/listing', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT payload

    // Create listing
    const newListing = new Listing({
      name: req.body.name,
      address: req.body.address,
      kindOf: req.body.kindOf,
      description: req.body.description,
      area: {
        lenght: req.body.area.lenght,
        width: req.body.area.width,
        height: req.body.area.height,
        floor: req.body.area.floor,
        weight: req.body.area.weight
      },
      owner: userId 
    });

    await newListing.save();
    res.status(201).json({
      message: 'Listing created successfully',
      listing: newListing
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
