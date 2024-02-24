import express from 'express';
import multer from 'multer';
import { createStep, deleteStepById, getAllSteps, getStepById, updateStepById } from '../../controllers/guidelines/step.controller.js';
import { verifyToken } from '../../middleware/verify.js';
import { isAdmin } from '../../middleware/isAdmin.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Create a new steps
router.post('/steps', upload.single('image'), verifyToken, isAdmin, createStep);

// Get all steps
router.get('/steps', getAllSteps);

// Get a steps by ID
router.get('/steps/:id', getStepById);

// Update a steps by ID
router.put('/steps/:id', upload.single('image'), verifyToken, isAdmin, updateStepById);

// Delete a steps by ID
router.delete('/steps/:id', verifyToken, isAdmin, deleteStepById);

export default router;
