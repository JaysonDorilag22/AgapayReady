import express from 'express';
import multer from 'multer';
import { register, login, userProfile } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/verifyToken.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the directory where files will be uploaded

router.post('/register', upload.single('avatar'), register); // Use upload.single middleware to handle avatar upload
router.post('/login', login);
router.get('/profile', authenticateToken, userProfile);

export default router;
