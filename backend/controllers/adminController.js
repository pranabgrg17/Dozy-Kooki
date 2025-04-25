// controllers/adminController.js
import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching users." });
  }
};

export const createSomething = async (req, res) => {
  // Admin-only create functionality
};
