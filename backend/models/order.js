import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // price for each item
    }
  ],
  address: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    tableNo: String,
  },
  ammount: { type: Number, required: true }, // Total order amount
  status: { type: String, default: "Food Processing" }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
