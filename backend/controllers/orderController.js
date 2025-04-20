import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order from frontend
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, tableNo } = req.body;
        const userId = req.userId; // ✅ Comes from authMiddleware

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            tableNo,
            payment: false // Payment will be verified after Esewa success
        });

        await newOrder.save();

        // Clear user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({
            success: true,
            message: "Order placed successfully!",
            orderId: newOrder._id
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

export { placeOrder };
