const express = require('express');
const Listing = require('../Schemas/listingScehma');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

//new listing created
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { userId } = req.user;

    // Validate minimal body fields
    const { name, address, kindOf, description, area } = req.body || {};
    if (!name || !address || !kindOf || !description || !area) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    
    const listing = new Listing({
      owner: userId,
      name,
      address,
      kindOf,
      description,
      area: {
        length: Number(area.length),
        width: Number(area.width),
        height: Number(area.height),
        floor: area.floor,
        weight: Number(area.weight)
      }
    });
    //saved the listing
    const saved = await listing.save();
    console.log(createdAt);
    return res.status(201).json({
      message: 'Listing created successfully',
      listing: saved
    });

  } catch (error) {
    console.error('Create listing error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/me', authenticateJWT, async (req, res) => {
  try {
    const { userId } = req.user;
    const listings = await Listing.find({ owner: userId }).sort({ createdAt: -1 });
    res.json({ listings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
