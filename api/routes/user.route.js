import express from 'express'
import { userHomePage } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userHomePage);
router.post('/update/:id', verifyToken, updateUser)

export default router;