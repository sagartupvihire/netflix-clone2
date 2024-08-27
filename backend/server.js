import cookieParser from 'cookie-parser';
import express from 'express';

import authrouter from './routes/auth.routes.js'
import moviesrouter from './routes/movie.routes.js';
import { ENV_VARS } from './config/envVars.js';
import { connnectDB } from './config/db.js';
import tvroutes from './routes/tv.routes.js';
import searchroutes from './routes/search.routes.js';
import path from "path"
import {protectRoutes} from './middlware/protectRoutes.js'

import dotenv from 'dotenv'
dotenv.config()
const app = express();
const __dirname = path.resolve()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = ENV_VARS.PORT || 5000;
app.use('/api/auth', authrouter );
app.use('/api/movie',protectRoutes,moviesrouter);
app.use('/api/tvshows',protectRoutes,tvroutes);
app.use('/api/search',protectRoutes,searchroutes);


if(ENV_VARS.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}
app.listen(port,()=>{
    console.log(`
Server is running on port http://localhost:${port}
`);
    connnectDB();
});

