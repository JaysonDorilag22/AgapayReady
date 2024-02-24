import express from 'express';
import multer from 'multer';
import { register, login, logout, updateUser} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verify.js';
import { signin } from '../controllers/auth.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/register', upload.single('avatar'), register); 
router.post('/login', login);
router.post('/sign-in', signin)
router.get('/logout', logout);
router.put('/update', verifyToken, updateUser); 

export default router;
