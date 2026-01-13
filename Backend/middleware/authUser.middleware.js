// this is to authenticate user , whenever user will try to : addProduct in cart and updateCart Data.

import jwt from 'jsonwebtoken'


const authUser = async (req, res, next) => {

    // console.log("Request headers:", req.headers);  // Log all headers to inspect

    const { accesstoken } = req.headers;

    if (!accesstoken) {
        return res.
            json({
                success: false,
                message: "User not Authorized , please login again"
            })
    }

    try {
        // console.log("Token received in middleware:", accesstoken);  // Log token to check

        // Verify the JWT token
        const decoded_accesstoken = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
        // console.log("Decoded access token:", decoded_accesstoken);


        // Add the user ID to the request body for further use
        req.body.userId = decoded_accesstoken._id

        // Proceed to the next middleware/route handler
        next()

    } catch (error) {
        // console.log("Token verification error:", error);
        let errorMessage = "Invalid token";
        let statusCode = 401

        // Specific error handling for expired tokens
        if (error.name === 'TokenExpiredError') {
            errorMessage = "Token has expired . Please Login again"
        }

        res.status(statusCode).json({
            success: false,
            message: errorMessage
        })
    }
}

export default authUser;