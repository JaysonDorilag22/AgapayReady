import express from 'express';
import { verifyToken } from '../middleware/verify.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { computeSentimentAndCategory, getAllFeedback, submitFeedback } from '../controllers/feedback.controller.js';

const router = express.Router();

// Route to get all feedback
router.post('/send-feedback', verifyToken, submitFeedback);
router.get('/feedback', verifyToken, isAdmin, getAllFeedback);
router.get('/feedbackResult', verifyToken, isAdmin, computeSentimentAndCategory);



export default router;
