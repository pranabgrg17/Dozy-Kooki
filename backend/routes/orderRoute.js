// routes/orderRoutes.js
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

// Place order (works for both Cash and eSewa)
orderRouter.post("/place", authMiddleware, placeOrder);

// Verify eSewa payment (called after eSewa redirects to success/failure)
orderRouter.post("/verify", authMiddleware,verifyOrder);

// Get orders placed by the logged-in user
orderRouter.get("/userorders", authMiddleware, userOrders);

// Admin: Get list of all orders
orderRouter.get("/list",  listOrders);

// Admin/User: Update order status (e.g., pending -> preparing)
orderRouter.post("/status", updateStatus);

export default orderRouter;
