import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // remains required
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object }, // If not required, remove required field
    tableNo: { type: String },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
