import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        cartData: {
            type: Object,
            default: {}
        }
    },
    {
        timestamps: true,
        minimize: false
    })

// Why use minimize: false?
// You might want to use minimize: false in scenarios where you want to explicitly store all fields, 
// even if they're empty. For instance, in our schema, we have a cartData field of type Object with a default value of {} (an empty object). 
// If minimize were set to true, Mongoose could remove the cartData field entirely from the database if it's an empty object, which might not be what you want
// By setting minimize: false, you ensure that the cartData field will be explicitly stored in MongoDB, even if it's empty.


// Middleware to hash password before saving it
UserSchema.pre('save', async function (next) {
    // password isn't modified
    if (!this.isModified("password")) return next()

    // password is modified , hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// to check password is correct or not .

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}




//Access token 
UserSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email
        },
        // process.env.JWT_SECRET,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
//refresh token
UserSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        // process.env.JWT_SECRET,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.models.User || mongoose.model("User", UserSchema);