import validator from "validator"
import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


//methodToGenerate: Refresh&AccesToken

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found")
        }
        // generate access & refresh Tokens
        // await them , because user.generateAccessToken() and user.RefreshToken() 
        //methods return a promise because they internally use jwt.sign()
        // which doesn't resolve immediately, but instead returns a promise.

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // save refresh token in DB:
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new Error(error.message, "smthing went wrong while gen.. refresh & access token");
    }
}



// Route for User register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);

        // Validation: fields should not be empty
        if (
            [name, email, password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json({
                success: false,
                message: "All the fields are required"
            });
        }

        // Validation: check if user already exists
        const existedUser = await User.findOne({ email })

        if (existedUser) {
            return res.json(
                {
                    success: false,
                    message: "User already exists"
                }
            )
        }

        // validating email and , strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a password of 8 or more characters" })
        }

        // Create the user
        const user = await User.create({
            name,
            email,
            password
        })

        // Use the correct user._id to find the created user not as (User._id)
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if (!createdUser) {
            return res.json({
                success: false,
                message: "Something went wrong while registering the user"
            })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        // console.log('Access Token:', accessToken);
        // console.log('Refresh Token:', refreshToken);

        return res.json({
            success: true,
            message: "User registered Successfully",
            user: createdUser,
            accessToken: accessToken,
            refreshToken: refreshToken
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong during registration"
        });
    }
}


// Route for User login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation: check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist!"
            });
        }

        // Validate password
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate Access and Refresh Tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        // Get the user data excluding sensitive fields (password and refreshToken)
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        // Set cookie options for secure cookies
        const cookieOptions = {
            httpOnly: true, // Prevents JavaScript from accessing the cookies
            secure : true
            // secure: process.env.NODE_ENV === 'development' // Set to true in production (HTTPS)
        };

        // Send response with cookies and user data
        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json({
                success: true,
                message: "User logged in successfully",
                user: loggedInUser,
                accessToken,
                refreshToken
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong during login"
        });
    }
}





// //Route for admin login

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(
                { email: process.env.ADMIN_EMAIL, isAdmin: true },  // Payload with email and isAdmin flag
                process.env.JWT_SECRET,                             // Secret key for signing
                { expiresIn: '24h' }                                 // Token expiration time
            );


            // Send the token back as part of the response
            res.json({
                success: true,
                message: "Admin login successful",
                token
            });

        } else {
            res.json({
                success: false,
                message: "Invalid Credentials",
            })
        }
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: error.message || "Something went wrong during AdminLogin"
        });
    }
}

export {
    registerUser,
    loginUser,
    adminLogin
}