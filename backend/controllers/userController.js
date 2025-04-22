import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;

        if (!name || !email || !password || !role || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill out all required fields"
            });
        }

        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            cartData: {}
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.log("Register error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error registering user, please try again later."
        });
    }
};

// LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill out all required fields"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // Removed expiresIn to make the token non-expiring
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            token,
            message: "Logged in successfully",
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Login error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error logging in. Please try again later."
        });
    }
};
