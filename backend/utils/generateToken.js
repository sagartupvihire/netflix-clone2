import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';


export const generateTokenAndSetCookie = (userid,res) => {
    const token = jwt.sign({ userid }, ENV_VARS.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("jwt-netflix",token,{
        maxAge: 15*24*60*60 *1000,
        httpOnly: true,

        secure: ENV_VARS.NODE_ENV !== 'development',
        sameSite: 'strict'
    })

    return token;
};

