const mongoose = require('mongoose');


require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb is Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;