import express from "express";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// Apply authMiddleware to routes that need authentication
orderRouter.post("/place", authMiddleware, placeOrder); // For PlaceOrder.jsx (cash payment)
orderRouter.post("/placeorder", authMiddleware, placeOrder); // For Payment.jsx (eSewa payment)
orderRouter.post("/verify", verifyOrder); // No auth needed if eSewa calls this
orderRouter.get("/user", authMiddleware, userOrders); // Align with previous path
orderRouter.get("/admin", authMiddleware, listOrders); // Align with previous path
orderRouter.post("/status", authMiddleware, updateStatus); // Added authMiddleware for security

export default orderRouter;