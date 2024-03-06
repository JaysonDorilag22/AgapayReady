import express from 'express';
import multer from 'multer';
import { register, login, logout, updateUser, confirmEmail } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verify.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/register', upload.single('avatar'), register); 
router.put('/confirm/:userId/:token', confirmEmail); 

router.post('/login', login);
router.get('/logout', logout);
router.put('/update', verifyToken, updateUser); 

export default router;
