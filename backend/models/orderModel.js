import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [
    {
      _id: String,
      name: String,
      description: String,
      price: Number,
      image: String,
      category: String,
      quantity: Number,
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    firstName: String,
    lastname: String,
    email: String,
    phone: String,
  },
  tableNo: {
    type: Number,
    required: true, // Keep as required since the form enforces it
  },
  transaction_uuid: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    default: "Food Processing",
  },
  payment: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);