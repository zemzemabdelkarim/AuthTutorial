import express from 'express'
import { userHomePage } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userHomePage);

export default router;