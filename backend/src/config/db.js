import { ENV } from "./env.js";
import mongoose from "mongoose";

// Connect to database
export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URL)
        console.log("✅✅ Connected to MongoDB successfully ✅✅");
    } catch (error) {
        console.log("Error connecting to MongoDB ");
       process.exit(1)
    }
}