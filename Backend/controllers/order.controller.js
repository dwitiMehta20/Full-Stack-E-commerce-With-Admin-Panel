import { Order } from '../models/order.models.js'
import { User } from '../models/user.models.js'
import Stripe from 'stripe'


//global variables :
const currency = 'usd'
const deliveryCharges = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Place order using COD method 
const placeOrderCod = async (req, res) => {

    try {

        // Destructure the necessary fields from the request body
        const { userId, items, amount, address } = req.body

        // Validate the required fields
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ message: "Missing Fields Required" });
        }

        // Validate the required fields
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: new Date()
        }

        // Create a instance of Order and save the new order
        const newOrder = new Order(orderData);
        await newOrder.save();

        // To clear cart data of this user , cartData will be reset and empty
        await User.findByIdAndUpdate(userId, { cartData: {} });

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: newOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: message.error || 'Server error. Could not place order.'
        });

    }

}

//Place order using Stripe
const placeOrderStripe = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: new Date()
        }

        const newOrder = new Order(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: message.error
        });
    }

}

// Verify StripePayment

const verifyStripe = async (req, res) => {

    const { orderId, success, userId } = req.body


    try {
        // console.log("Verifying payment for orderId:", orderId);
        // console.log("Payment success:", success);
        // console.log("User ID to update:", userId);

        if (success === 'true') {
            await Order.findByIdAndUpdate(orderId, { payment: true })

            // Update the user's cartData
            const UpdateCartResult = await User.findByIdAndUpdate(userId, { cartData: {} });
            console.log("Updated cart result:",UpdateCartResult)

            // check if update failed:
            if (!UpdateCartResult) {
                throw new Error("Failed to clear user's cartData");
            }
            await User.findByIdAndUpdate(userId, { cartData: {} })

            res.json({
                success: true,

            })
        } else {
            // If payment failed, delete the order
            await Order.findByIdAndDelete(orderId)
            res.json({
                success: false,
                message: "Payment Failed"
            })
        }


    } catch (error) {
        console.error("Error during Stripe verification:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });

    }
}


// Place order RazorPay 
const placeOrderRazorPay = async (req, res) => {

}


// All orders data for Admin Panel 
const allOrders = async (req, res) => {
    try {

        const orders = await Order.find({});
        res.json({
            success: true,
            orders
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error. Could not display all orders on admin panel.'
        });
    }
}

// User Order data for Frontend 
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body;

        const orders = await Order.find({ userId });

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found for this user.'
            });
        }

        res.json({
            success: true,
            orders
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: message.error || 'Server error. Could not display order details.'
        });
    }
}

// Update order status from Admin Panel
const updateOrderStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body

        await Order.findByIdAndUpdate(orderId, { status })

        res.json({
            success: true,
            message: "Status Updated"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export {
    placeOrderCod,
    placeOrderRazorPay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateOrderStatus,
    verifyStripe
}