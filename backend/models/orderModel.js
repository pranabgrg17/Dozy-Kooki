// Import Mongoose to define MongoDB schema and model
import mongoose from "mongoose";

// Create a new schema for orders
const orderSchema = new mongoose.Schema({
  // Reference to the user who placed the order (required)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  // Array of food items ordered
  items: [
    {
      _id: String,              // Unique ID of the food item (from your food menu)
      name: String,             // Name of the food item
      description: String,      // Description of the item
      price: Number,            // Price per unit
      image: String,            // Image URL or path
      category: String,         // Food category (e.g., drinks, main course)
      quantity: Number,         // Quantity of this item ordered
    },
  ],

  // Total amount of the order (required)
  amount: {
    type: Number,
    required: true,
  },

  // Customer delivery details or billing address
  address: {
    firstName: String,         // Customer's first name
    lastname: String,          // Customer's last name
    email: String,             // Customer's email address
    phone: String,             // Customer's phone number
  },

  // Table number for dine-in orders (required)
  tableNo: {
    type: Number,
    required: true,
  },

  // Unique identifier for the eSewa payment transaction
  transaction_uuid: {
    type: String,
    unique: true,
  },

  // Status of the order (default is "Food Processing")
  status: {
    type: String,
    default: "Food Processing",
  },

  // Payment status (false = not paid, true = paid)
  payment: {
    type: Boolean,
    default: false,
  },

  // Timestamp of when the order was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Mongoose model based on the orderSchema
export default mongoose.model("Order", orderSchema);
