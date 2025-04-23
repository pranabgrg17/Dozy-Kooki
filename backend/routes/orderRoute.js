import express from "express";
import {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// Cash and eSewa order placement (same controller)
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/placeorder", authMiddleware, placeOrder);

// Payment verification (from eSewa redirect)
orderRouter.post("/verify", verifyOrder);

// User order history
orderRouter.get("/user", authMiddleware, userOrders);

// Admin order list
orderRouter.get("/admin", authMiddleware, listOrders);

// Update order status
orderRouter.post("/status", authMiddleware, updateStatus);

export default orderRouter;
