// models/orderModel.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    address: String,
    items: Array,
    amount: Number,
    tableNo: Number,
    transaction_uuid: String,
    status: {
        type: String,
        default: "Food Processing", //  Add this default
    },
    payment: {
        type: Boolean,
        default: false, //  Add this default
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;
