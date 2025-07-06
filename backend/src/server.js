import express from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
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
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);


// error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({error: err.message || "Internal server error"});
})

// the startServer function
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