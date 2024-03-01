import express from 'express';
import multer from 'multer';
import { register, login, logout, updateUser} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verify.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/register', upload.single('avatar'), register); 
router.post('/login', login);
router.get('/logout', logout);
router.put('/update', verifyToken, updateUser); 

export default router;
