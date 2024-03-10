import express from 'express';
import { verifyToken } from '../middleware/verify.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { computeSentimentAndCategory, getAllFeedback, submitFeedback} from '../controllers/feedback.controller.js';

const router = express.Router();

// Route to submit feedback
router.post('/send-feedback', verifyToken, submitFeedback);

// Route to get all feedback
router.get('/feedback', verifyToken, isAdmin, getAllFeedback);

// Route to compute sentiment and category for feedback
router.get('/feedbackResult', verifyToken, isAdmin, computeSentimentAndCategory);



export default router;
