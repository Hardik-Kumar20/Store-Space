const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/check-auth" , authMiddleware , (req , res )=>{
    res.json({
        message : "Authenticated",
        user : req.user
    })
})

module.exports = router;