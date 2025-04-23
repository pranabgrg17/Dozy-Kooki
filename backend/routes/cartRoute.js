// routes/orderRoutes.js
import express from "express";
import {placeOrder,verifyOrder,userOrders,listOrders,} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ✅ Protect order placement and user/admin views
router.post("/place", authMiddleware, placeOrder);
router.get("/user", authMiddleware, userOrders);
router.get("/admin", authMiddleware, listOrders);

// ✅ Verification might be public or secured
router.post("/verify", verifyOrder);

export default router
