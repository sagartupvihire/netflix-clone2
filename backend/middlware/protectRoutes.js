import jwt from  "jsonwebtoken";
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js'

export const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token is required' });
        }

        const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Not authorized, token is invalid' });
        }
        const user = await User.findById(decoded.userid).select('-password');
        if(!user){
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected routes: " + error.message);
        res.status(401).json({ message: 'Internal Server Error' });

    }

};