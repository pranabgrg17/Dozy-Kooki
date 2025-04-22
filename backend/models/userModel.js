import mongoose from "mongoose";

// Defining the schema for the user model
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true // User's name
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, // Email should be unique
    },
    role: {
        type: String,
        enum: ["user", "admin"], // User can either be 'user' or 'admin'
        default: "user", // Default role is 'user'
    },
    phone: { 
        type: Number, // User's phone number (optional)
    },
    password: { 
        type: String, 
        required: true // User's password (required for login)
    },
    cartData: { 
        type: Object, 
        default: {} // Cart data (items added by the user)
    },
}, { minimize: false }); // This prevents mongoose from removing empty objects

// Creating the User model using the schema
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
