import express from 'express';
import { login, logout, signup ,authCheck} from '../controlller/auth.controller.js';
import {protectRoutes} from '../middlware/protectRoutes.js'

const router =express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout',logout);
router.get('/authcheck', protectRoutes, authCheck);

export default router;