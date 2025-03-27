import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

// App Config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB(); 

//API endpoints 
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))//to access uploaded image to frontend

app.get("/", (req, res) => {
    res.send("API Working");
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
