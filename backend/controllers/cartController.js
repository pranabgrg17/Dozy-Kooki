import userModel from "../models/userModel.js"

//add items to user cart 
const addToCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById(req.body.userId);
        
        // If user is not found, return a 404 response
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure cartData exists, if not initialize it as an empty object
        let cartData = userData.cartData || {};

        // Add item to the cart or update quantity
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;  // Add the item with quantity 1 if not already in cart
        } else {
            cartData[req.body.itemId] += 1;  // Increment quantity if item already in cart
        }

        // Update the user's cart in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Send success response
        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding item to cart" });
    }
};


//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Find user
        let userData = await userModel.findById(req.body.userId);

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure cartData exists
        let cartData = userData.cartData || {};

        // Check if the item exists in the cart
        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // If quantity goes to 0, optionally remove the item
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        // Save updated cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing item from cart" });
    }
};


//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};  // Default to an empty object if cartData is missing
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}


export { addToCart, removeFromCart, getCart }