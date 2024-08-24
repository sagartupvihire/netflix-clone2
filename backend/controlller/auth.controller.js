import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup (req, res){
    try {
        const {email, password, username} = req.body;
        if(!email || !password || !username) {
            
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({success:false,message: "Password must be at least 6 characters long"});
        }
        // const existingUserByEmail = await User.findOne({email: email});
        // if(existingUserByEmail){
        //     return res.status(400).json({success:false, message: "Email already exists"});
        // }

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
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            const saveuser = await newUser.save();
            console.log("new user saved" , saveuser);
            
            res.status(201).json({success: true, user: saveuser});
        }

    } catch (error) {
        console.log("Error in auth controller: " + error.message);
        res.status(500).json({success: false, error: error})
    }
}


export async function login (req, res){
    try {
        const {email, password} = req.body;
       console.log(email, password);
       
        if(!email ||!password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({success: false, message: "User not found in the database"});
        }
        const passwordCorrect = await bcryptjs.compare(password,user.password);
        if(!passwordCorrect){
            console.log(passwordCorrect);
            return res.status(401).json({success: false, message: "user not found password"});
        }

        generateTokenAndSetCookie(user._id,res);
        res.json({success: true, message: "Logged in successfully", user:{
           ...user._doc,   
           password: "",
        }});
    }catch (error) {
            console.log("Error in auth controller: " + error.message);
            res.status(500).json({success: false, error: error})
        }
}

export async function logout (req, res){
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success: true, message: "logout successfully" });
    } catch (error) {
        console.log("Error in auth controller: " + error.message);
        res.status(500).json({success: false, error: error})
    }
}
export async function authCheck (req, res){
    try {
        
		res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log("Error in auth controller: " + error.message);
        res.status(500).json({success: false, error: error})
    }
}