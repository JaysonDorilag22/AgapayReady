import express from 'express';
import multer from 'multer';
import { createGuideline, getAllGuidelines, getGuidelineById, updateGuidelineById, deleteGuidelineById, getGuidelineWithSteps } from '../../controllers/guidelines/guidelines.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { isAdmin } from '../../middleware/isAdmin.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Create a new guideline
router.post('/guidelines', upload.single('image'), verifyToken, isAdmin, createGuideline);

// Get all guidelines
router.get('/guidelines', getAllGuidelines);

// Get a guideline by ID
router.get('/guidelines/:id', getGuidelineById);

// Update a guideline by ID
router.put('/guidelines/:id', upload.none(), updateGuidelineById);

// Delete a guideline by ID
router.delete('/guidelines/:id', deleteGuidelineById);

router.get('/guidelines/:id/steps', getGuidelineWithSteps);

export default router;
