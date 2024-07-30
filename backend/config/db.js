import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connnectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("error: connecting to db", error);
        process.exit(1);
    }
};