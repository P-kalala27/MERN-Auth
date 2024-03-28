//connection a la base de donnees avec mongoose

import mongoose from "mongoose";
const connectDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb connected to ${db.connection.host}`);
    } catch (error) {
        console.error(`mongodb connection error: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB;