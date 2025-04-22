import orderModel from '../models/orderModel.js';

/**
 * ✅ Place a new order
 * Requires authMiddleware to attach req.userId
 */
export const placeOrder = async (req, res) => {
    try {
        // Get user ID from the authenticated token
        const userId = req.userId;

        // Destructure fields from request body
        const { address, items, amount, tableNo, transaction_uuid } = req.body;

        // ✅ Validate required fields
        if (!address || !items || !amount || !tableNo) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // ✅ Create new order object
        const orderData = {
            userId,
            items,
            amount,
            tableNo,
            address,
            transaction_uuid,
            status: "Food Processing", // Initial status
            payment: false             // Payment not verified yet
        };

        // ✅ Save the order in MongoDB
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // ✅ Respond with success and order ID
        res.json({
            success: true,
            message: "Order placed successfully",
            orderId: newOrder._id
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

/**
 * ✅ Verify payment via eSewa callback
 * This should be triggered by frontend after redirect or a webhook
 */
export const verifyOrder = async (req, res) => {
    try {
        const { transaction_uuid, status } = req.body;

        // Find the order using the transaction UUID
        const order = await orderModel.findOne({ transaction_uuid });

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // ✅ Update payment and status based on eSewa result
        if (status === "success") {
            order.payment = true;
            order.status = "Confirmed";
        } else {
            order.status = "Payment Failed";
        }

        await order.save();

        res.json({
            success: status === "success",
            message: status === "success"
                ? "Payment verified successfully"
                : "Payment verification failed"
        });

    } catch (error) {
        console.error("Error verifying order:", error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

/**
 * ✅ Get all orders for a specific logged-in user
 * Requires authMiddleware to attach req.userId
 */
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;

        // Fetch orders for this user, sorted by most recent
        const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
};

/**
 * ✅ Admin view: List all orders
 * Requires authMiddleware to validate access
 */
export const listOrders = async (req, res) => {
    try {
        // Fetch all orders, sorted by newest
        const orders = await orderModel.find().sort({ createdAt: -1 });

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error listing orders:", error);
        res.json({ success: false, message: "Error listing orders" });
    }
};
