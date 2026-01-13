import { v2 as cloudinary } from "cloudinary"
import { Product } from "../models/product.models.js"
import mongoose from "mongoose";


// function for adding products:
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // console.log(req.body); // Logs all the fields from the body
        // console.log(req.files); // Logs the file data to check if they were uploaded correctly

        // console.log(name, description, price, category, subCategory, sizes, bestSeller);
        // console.log(image1, image2, image3, image4);

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        // console.log(images);

        // Check if at least one image is uploaded
        if (images.length === 0) {
            return res.json({
                success: false,
                message: "At least one image is required"
            })
        };

        // Check if images are valid
        // images.forEach((item) => {
        //     if (!item.mimetype.startWith("/image/")) {
        //         return res.json({
        //             success: false,
        //             message: "Only Images are allowed"
        //         })
        //     }
        // });


        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;  // return the URL of the uploaded image
                } catch (uploadError) {
                    console.log(uploadError);
                    return null;  // Return null if upload fails
                }
            })
        );

        //filter out failed images (null values);
        imagesUrl = imagesUrl.filter((url) => url !== null);
        if (imagesUrl.length === 0) {
            return res.json({
                success: false,
                message: "Failed to upload images"
            })
        }


        // console.log(imagesUrl); // Log the uploaded image URLs

        const productData = {
            name,
            description,
            category,
            price: Number(price), // as we'll get price in string format from form data.
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes), // converting string to array using JSON.parse
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData)
        const product = new Product(productData);
        await product.save();


        res.json({
            success: true,
            message: "Product Added"
        })



    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// function for listing products
const listProducts = async (req, res) => {
    try {

        const products = await Product.find({});

        res.json({
            success: true,
            products  // return this array
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


// function for removing products
const removeProduct = async (req, res) => {
    try {

        // console.log(req.body.id)
        // Check if ID is valid
        // if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
        //     return res.json({
        //         success: false,
        //         message: "Invalid product ID"
        //     });
        // }


        const product = await Product.findByIdAndDelete(req.body.id);

        if (!product) {
            return res.json({
                success: false,
                message: "Product not found"
            })
        };

        res.json({
            success: true,
            message: "Product Removed"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }

}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        // console.log(productId)

        const product = await Product.findById(productId);

        if (!product) {
            return res.json({
                success: false,
                message: "Product not found"
            })
        };

        res.json({
            success: true,
            product

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
    addProduct,
    listProducts,
    removeProduct,
    singleProduct
}