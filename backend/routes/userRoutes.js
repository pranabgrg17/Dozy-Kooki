// routes/userRoutes.js
import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js"; // This line should work now

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
