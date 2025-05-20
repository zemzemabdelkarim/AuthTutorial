import express from 'express'
import { updatePicture, userHomePage } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser } from '../controllers/user.controller.js';
import upload from '../utils/uploadPicture.js';

const router = express.Router();

router.get('/', userHomePage);
router.post('/update/:id', verifyToken, updateUser);
router.post('/updatePicture', upload.single('image'), updatePicture);

export default router;