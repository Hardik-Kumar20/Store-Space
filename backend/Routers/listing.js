const express = require('express');
const Listing = require('../Schemas/listingScehma');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

//new listing created
router.post('/listing', authenticateJWT, async (req, res) => {
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
    console.log(saved.createdAt);
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




//sending the listing data to frontend
router.get("/stores", async (req, res) => {
  try {
      const { location } = req.query;
      let filter = {};

      if (location) {
          filter.address = { $regex: location, $options: "i" };
      }

      const stores = await Listing.find(filter);
      res.json(stores);
  } catch (error) {
      res.status(500).json({ error: "Error fetching stores" });
  }
});





router.get('/getlistings/:id' , async (req , res)=>{
  try {
    const store = await Listing.findById(req.params.id);
    if(!store) return res.status(400).json({message : "Store not found."})
    res.json(store)
  console.log("this is the store detailed page" , store)
  } catch (error) {
    res.status(500).json({ error: "Error fetching store" });
  }
})

module.exports = router;
