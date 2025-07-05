import express from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js"
const app = express();


// The middleware
app.use(cors())
app.use(express.json());

// Handle the authentication
app.use(clerkMiddleware());



// Connect to Database
// connectDB();

// The routes
app.get("/", (req, res) => res.send("✅ Hello from server"))
app.use("/api/user", userRoutes);
const startServer = async () => {
    try {
        // Connect to Database
        await connectDB();
        app.listen(ENV.PORT, () => console.log("✅ Server is up running on PORT :", ENV.PORT, "✅"))
    } catch (error) {
        console.error("Failed to start server :", error.message);
        process.emit(1);
    }
}

startServer();