import express from 'express'
import { deleteUser, updatePicture, userHomePage } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser } from '../controllers/user.controller.js';
import upload from '../utils/uploadPicture.js';

const router = express.Router();

router.get('/', userHomePage);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/updatePicture', upload.single('image'), updatePicture);

export default router;