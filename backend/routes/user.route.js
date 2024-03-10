import express from 'express';
import multer from 'multer';
import { register, login, logout, updateUser, confirmEmail, getAllUsers } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verify.js';
import { isAdmin } from '../middleware/isAdmin.js'

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/register', upload.single('avatar'), register); 
router.put('/confirm/:userId/:token', confirmEmail); 

router.post('/login', login);
router.get('/logout', logout);
router.get('/users', verifyToken, isAdmin, getAllUsers);


// Modify this route to accept the 'coverPhoto' field
router.put('/update/:userId', verifyToken, upload.single('coverPhoto'), updateUser); 

export default router;
