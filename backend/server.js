import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from 'public/images' directory (or just 'public' if you have everything inside it)
app.use('/images', express.static('public/images'));  // Adjusted for a specific 'images' folder if needed

// DB Connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// API root endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
