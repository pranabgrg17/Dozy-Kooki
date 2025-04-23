import orderModel from "../models/orderModel.js";

// Place Order (for Payment.jsx)
export const placeOrder = async (req, res) => {
  try {
    const { address, items, amount, tableNo, transaction_uuid } = req.body;
    const userId = req.body.userId || "67f5581847c44e8fdc79c00d"; // Use userId from token or default

    const newOrder = new orderModel({
      userId,
      items: items.map(item => ({
        _id: item._id,
        quantity: item.qty,
      })),
      amount,
      address,
      tableNo,
      transaction_uuid,
      status: "Food Processing",
      payment: false,
    });

    await newOrder.save();
    console.log("Order placed:", newOrder);

    return res.json({
      success: true,
      message: "Order placed, proceed to eSewa payment",
      transaction_uuid,
      orderId: newOrder._id,
      amount,
    });
  } catch (error) {
    console.log("Error placing order:", error);
    res.json({
      success: false,
      message: "Error placing order",
    });
  }
};

// Verify Order (for eSewa payment)
export const verifyOrder = async (req, res) => {
  try {
    console.log("Verify Order Request Body:", req.body);
    const { transaction_uuid, status } = req.body;

    if (!transaction_uuid) {
      return res.json({
        success: false,
        message: "Transaction UUID is required",
      });
    }

    const order = await orderModel.findOne({ transaction_uuid });
    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    // Handle different status values from eSewa
    const successStatuses = ["success", "COMPLETE"]; // Add more as needed
    if (successStatuses.includes(status)) {
      order.status = "Confirmed";
      order.payment = true;
      await order.save();
      console.log("Updated Order:", order);
      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.log("Error verifying order:", error);
    res.json({
      success: false,
      message: "Error verifying payment",
    });
  }
};

// Get User Orders
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("Error fetching user orders:", error);
    res.json({
      success: false,
      message: "Error fetching user orders",
    });
  }
};

// List All Orders (for Admin)
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("Error fetching all orders:", error);
    res.json({
      success: false,
      message: "Error fetching all orders",
    });
  }
};

// Update Order Status (for Admin)
export const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};