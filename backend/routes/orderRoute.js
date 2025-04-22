import express from "express";
import { placeOrder, verifyOrder, userOrders, listOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verifyOrder); // Public (or also use middleware if needed)
router.get("/user", authMiddleware, userOrders);
router.get("/admin", authMiddleware, listOrders);

export default router;
