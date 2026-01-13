import { User } from "../models/user.models.js"



// add products to cart
const addToCart = async (req, res) => {
    try {
        // console.log("Request body:", req.body);  // Log the body to check the incoming request data
        const { userId, itemId, size } = req.body;

        if (!userId || !itemId || !size) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }



        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Log current cartData before modification
        // console.log("Before update:", userData.cartData);

        let cartData = userData.cartData || {};  // Ensure cartData exists, even if empty

        if (!cartData[itemId]) {
            cartData[itemId] = {};  // Initialize item if not exists
        }

        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;  // Increment quantity if size exists
        } else {
            cartData[itemId][size] = 1;  // Initialize the size with quantity 1 if not exists
        }

        // Log cartData after modification
        // console.log("After update:", cartData);

        // Update the user document with the new cartData
        const updatedUser = await User.findByIdAndUpdate(userId, { cartData }, { new: true });
        // console.log("Updated User:", updatedUser);  // This will show the updated user document


        res.json({
            success: true,
            message: "Added to cart"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};



// update user cart
const updateCart = async (req, res) => {

    try {

        const { userId, itemId, size, quantity } = req.body

        const userData = await User.findById(userId);
        let cartData =  userData.cartData || {}

        if (!cartData[itemId]) {
            cartData[itemId] = {};  // Initialize item if not exists
        }

        cartData[itemId][size] = quantity

        await User.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({
            success: true,
            message: "Cart Updated"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


// get user cart data 
const getUserCart = async (req, res) => {

    try {

        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }


        const userData = await User.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let cartData = await userData.cartData || {}

        


        res.json({
            success: true,
            cartData
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


export {
    addToCart,
    updateCart,
    getUserCart
}