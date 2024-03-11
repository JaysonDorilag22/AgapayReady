import express from 'express';
import { search } from '../controllers/search.controller.js';
import { verifyToken } from '../middleware/verify.js';


const router = express.Router();

// Route to submit feedback
router.get('/search', verifyToken, search);




export default router;
