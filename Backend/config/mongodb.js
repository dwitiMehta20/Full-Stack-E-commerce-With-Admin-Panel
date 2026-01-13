import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
});

const connectDB = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
        console.log(`\n MONGODB Connected!! DB HOST :${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB CONNECTION ERROR", error);
        // current jo applicaion chal rahi h wo ek process pe  chal rahi h aur ye process uska refrence h
        process.exit(1)
    }
}


export default connectDB