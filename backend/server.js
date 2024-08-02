import cookieParser from 'cookie-parser';
import express from 'express';

import authrouter from './routes/auth.routes.js'
import moviesrouter from './routes/movie.routes.js';
import { ENV_VARS } from './config/envVars.js';
import { connnectDB } from './config/db.js';
import tvroutes from './routes/tv.routes.js';
import searchroutes from './routes/searh.routes.js';

import {protectRoutes} from './middlware/protectRoutes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = ENV_VARS.PORT || 5000;
app.use('/api/auth', authrouter );
app.use('/api/movies',protectRoutes,moviesrouter);
app.use('/api/tv',protectRoutes,tvroutes);
app.use('/api/search',protectRoutes,searchroutes);

app.listen(port,()=>{
    console.log(`
Server is running on port http://localhost:${port}
`);
    connnectDB();
});
