const express = require('express');
const mongoose = require('mongoose');
const mainPageRouter = express.Router();
const mainPageSchema = require("../Schemas/mainPageSchema");




// sending the autocomplete suggestions 
mainPageRouter.get('/autocomplete/api' , async (req , res)=>{
    const location = req.query.text;
    const apiKey = process.env.API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(location)}&limit=5&filter=countrycode:us&types=city,state,locality,address&apiKey=${apiKey}`;
    const response = await fetch(url)
    const data = await response.json();
    
    console.log("Geoapify Response:", data);

    const results = data.features.map(f => f.properties.formatted);
    res.json({results})
})








mainPageRouter.post('/searchBar' , async (req , res)=>{
    try {
        const {location , checkin , checkout , size} = req.body;
        if(!location || !checkin || !checkout || !size){
            return res.status(400).json({message : "Bad Request may be form is not fully filled"});
        }
        const searchBarData = new mainPageSchema({
            location,
            checkin,
            checkout,
            size
        }) 
        const saved = await searchBarData.save();
        console.log(saved);
        if(saved) return res.status(200).json({message : "Data from Search bar saved properly"});
    } catch (error) {
        console.log(res.status(500).json({message : "Some problem in getting the data from frontend.."}))
    }
})



// This is to show the data on the result page 
mainPageRouter.get("/resultPage" , async (req,res)=>{
    try {
        const result = await mainPageSchema.findOne().sort({ createdAt: -1 });
        if (result) {
            res.json({ location: result.location });
            console.log(result, "This is the latest search data from mainpage.js");
        } else {
            res.json({location : "No location found on this search"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "There is problem in fetching the data fro the result page."})
    }
})



module.exports = mainPageRouter;