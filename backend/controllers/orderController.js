import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"

// =============================
// 📦 Place Order (Cash/eSewa)
// =============================
export const placeOrder = async (req, res) => {
  try {
    const { address, items, amount, tableNo, transaction_uuid } = req.body;


    console.log('request item = ' , items)


  
    
    // ✅ Use userId from token (set by auth middleware)
    const userId = req.userId;

  // await foodModel.find({_id : {$in : items._id}})




    // Create new order document
    const newOrder = new orderModel({
      userId,
      items: items.map(item => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      amount,
      address,
      tableNo,
      transaction_uuid: transaction_uuid || null, // Only needed for eSewa
      status: "Food Processing",
      payment: false,
    });

    // Save to DB
    await newOrder.save();
    console.log("Order placed:", newOrder);
  

    // Response
    return res.json({
      success: true,
      message: transaction_uuid
        ? "Order placed, proceed to eSewa payment"
        : "Cash order placed successfully",
      transaction_uuid,
      orderId: newOrder._id,
      amount,
    });

  } catch (error) {
    console.log("Error placing order:", error);
    res.json({
      success: false,
      message: error.message || "Error placing order",
    });
  }
};

// =============================
// ✅ Verify Order After eSewa Payment
// ============================
export const verifyOrder = async (req, res) => {
  try {
    // Log the incoming request body to help with debugging
    console.log("Incoming verify request:", req.body);

    // Destructure the required fields from the request body
    const { transaction_uuid, status } = req.body;

    // Log the values of the destructured data to verify what we are getting
    console.log("Destructured Data:", { transaction_uuid, status });

    // Validate required fields
    if (!transaction_uuid || !status) {
      console.log("Missing fields: ", { transaction_uuid, status });
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // If the payment status is not success, return early with an error
    if (status !== "success") {
      console.log("Payment failed, status:", status);
      return res.status(400).json({ success: false, message: "Payment failed" });
    }

    // Check if the order with the given transaction_uuid exists
    const existingOrder = await orderModel.findOne({ transaction_uuid });
    if (!existingOrder) {
      console.log("Order not found for transaction_uuid:", transaction_uuid);
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update the order with payment success details
    existingOrder.status = "Payment Completed"; // Mark the order as paid
    existingOrder.payment = true; // Set payment status to true
    await existingOrder.save();

    // Respond with success
    res.status(200).json({ success: true, message: "Payment verified and order updated", orderId: existingOrder._id });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =============================
// 🧾 Get Orders for Logged-in User
// =============================
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Get userId from token
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

// =============================
// 📋 List All Orders (Admin)
// =============================
// controllers/orderController.js
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({success: false,message:"Error"})
  }
};


// =============================
// 🔄 Update Order Status (Admin)
// =============================
export const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log("Error updating order status:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};

