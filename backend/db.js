const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connection to mongoDB have been established");
})
.catch((err) => {
    console.log("Error found" + err);
})