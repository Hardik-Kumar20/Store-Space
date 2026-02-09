const express = require('express');
const mongoose = require('mongoose');
const mainPageRouter = express.Router();
const mainPageSchema = require("../Schemas/mainPageSchema");




// sending the autocomplete suggestions 
mainPageRouter.get('/search' , async (req , res)=>{
    try {
        const location = req.query.text;
        if(!location){
            return res.status(400).json({message: "Query text is required"});
        }
        const apiKey = process.env.API_KEY;
        if(!apiKey){
            return res.status(500).json({message: "API key not configured"});
        }
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(location)}&limit=5&filter=countrycode:us&types=city,state,locality,address&apiKey=${apiKey}`;
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`Geoapify error: ${response.status}`);
        }
        const data = await response.json();
        
        console.log("Geoapify Response:", data);

        const results = data.features.map(f => f.properties.formatted || []);
        res.json({results})
    } catch (error) {
        console.log("Autocomplete error:", error.message);
        res.status(500).json({message: "Failed to fetch autocomplete results"});
    }
})




mainPageRouter.get("/result", (req, res) => {
    const { location, checkin, checkout, size } = req.query;
    if (!location || !checkin || !checkout || !size) {
      return res.status(400).json({ message: "Missing params" });
    }
  
    res.json({ location, checkin, checkout, size });
  });



 

module.exports = mainPageRouter;