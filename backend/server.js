import express from 'express';
import authrouter from './routes/auth.routes.js'
import { ENV_VARS } from './config/envVars.js';
import { connnectDB } from './config/db.js';
const app = express();

app.use(express.json());


const port = ENV_VARS.PORT || 5000;
app.use('/api/auth',authrouter )
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
    connnectDB();
});