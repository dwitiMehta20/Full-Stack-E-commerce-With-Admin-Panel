import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
        required: true,
    },
    bestseller: {
        type: Boolean,
        default : false // set it to false by default. This makes sure that the field is not left undefined, which may lead to confusion.
    },
    date: {
        type: Date,
        required: true
    }
},
    // Automatically adds createdAt and updatedAt
    { timestamps: true }
)


export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
