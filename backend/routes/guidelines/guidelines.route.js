import express from 'express';
import multer from 'multer';
import { createGuideline, deleteGuidelineById, getAllGuidelines, getGuidelineById, updateGuidelineById } from '../../controllers/guidelines/guidelines.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/guidelines', upload.single('image'), createGuideline);
router.get('/guidelines', getAllGuidelines);
router.get('/guidelines/:id', getGuidelineById);
router.put('/guidelines/:id', upload.single('image'), updateGuidelineById);
router.delete('/guidelines/:id', deleteGuidelineById);

export default router;
