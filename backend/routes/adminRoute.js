// routes/adminRoutes.js
import express from "express";
import authMiddleware from "../middleware/auth.js";  // Admin auth middleware
import adminController from "../controllers/adminController.js";  // Create an admin controller

const adminRouter = express.Router();

// Example admin route: Admin can view all users
adminRouter.get("/users", authMiddleware, adminController.getAllUsers);  // This will require admin access

// Example route for creating something as an admin
adminRouter.post("/create", authMiddleware, adminController.createSomething);

export default adminRouter;
