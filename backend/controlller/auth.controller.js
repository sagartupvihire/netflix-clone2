import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
export async function signup (req, res){
    try {
        const {email, password, username} = req.body;
        if(!email || !password || !username) {
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({success:false,message: "Password must be at least 6 characters long"});
        }
        const existingUserByEmail = await User.findOne({email: email});
        if(existingUserByEmail){
            return res.status(400).json({success:false, message: "Email already exists"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const PROFILE_PICS =['/avatar1.png', '/avatar2.png', '/avatar3.png']
        const image = PROFILE_PICS[(Math.floor(Math.random() * PROFILE_PICS.length))]
        const newUser = new User({
            email,
            password :hashedPassword,
            username,
            image
        });
        const saveuser = await newUser.save();
        res.status(201).json({success: true, user: saveuser});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: error})
    }
}

export async function login (req, res){
    res.send("Welcome to the")
}

export async function logout (req, res){
    res.send("Welcome to the")
}