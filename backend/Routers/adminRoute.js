const express = require("express");
const Listing = require("../models/Listing");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const router = express.Router();




router.get("./pending-listings", authenticate, authorize("admin"), async (req, res) => {
    try{
        const listings = await Listing.find({ approvalStatus: "pending"}).populate("owner", "userName").sort({createdAt: -1});

        req.json(listings);
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
})




// PATCH /admin/approve-listing/:id
router.patch("/approve-listing/:id", authenticate, authorize("admin"), async (req, res) => {
      try {
        const listing = await Listing.findById(req.params.id);
  
        if (!listing) {
          return res.status(404).json({ message: "Listing not found" });
        }

        if (listing.approvalStatus !== "pending") {
            return res.status(400).json({ message: "Already reviewed" });
          }          
  
        listing.approvalStatus = "approved";
        await listing.save();
  
        res.json({ message: "Listing approved" });
  
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }
  );
  



  // PATCH /admin/reject-listing/:id
router.patch("/reject-listing/:id", authenticate, authorize("admin"), async (req, res) => {
      try {
        const listing = await Listing.findById(req.params.id);
  
        if (!listing) {
          return res.status(404).json({ message: "Listing not found" });
        }
  
        if (listing.approvalStatus !== "pending") {
            return res.status(400).json({ message: "Already reviewed" });
          }          

        listing.approvalStatus = "rejected";
        await listing.save();
  
        res.json({ message: "Listing rejected" });
  
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }
  );
  


  module.exports = router;
