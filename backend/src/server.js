import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

// Connect to Database
// connectDB();
app.get("/", (req, res) => res.send("✅ Hello from server"))

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