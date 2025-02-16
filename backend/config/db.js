//connection a la base de donnees avec mongoose

import mongoose from "mongoose";
const MONGODB_URL="mongodb+srv://princekalala29:8U6fD5KSfYx71fGI@cluster0.7fodo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () =>{
    try {
        const db = await mongoose.connect(MONGODB_URL)
        console.log(`mongodb connected to ${db.connection.host}`);
    } catch (error) {
        console.error(`mongodb connection error: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB;