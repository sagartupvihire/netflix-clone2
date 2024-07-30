import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: ''
    },
    searchHistory: {
        type: [],
        default: []
    }

})

export const User = mongoose.model("User", userSchema);