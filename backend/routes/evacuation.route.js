// import express from 'express';
// import multer from 'multer';
// import { createEvacuationGuideline, deleteEvacuationGuideline, getEvacuationGuidelineById, getEvacuationGuidelines, updateEvacuationGuideline } from '../controllers/evacuation.guidelines.controller.js';

// const router = express.Router();

// // Configure multer to specify the destination folder for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Route for creating a new evacuation guideline with file upload
// router.post('/evacuation-guidelines', upload.single('image'), createEvacuationGuideline);

// // Route for getting all evacuation guidelines
// router.get('/evacuation-guidelines', getEvacuationGuidelineById);

// // Route for getting a single evacuation guideline by ID
// router.get('/evacuation-guidelines/:id', getEvacuationGuidelines);

// // Route for updating a single evacuation guideline by ID
// router.put('/evacuation-guidelines/:id', upload.single('image'), updateEvacuationGuideline);

// // Route for deleting a single evacuation guideline by ID
// router.delete('/evacuation-guidelines/:id', deleteEvacuationGuideline);

// export default router;
import express from 'express';
import { createEvacuationGuideline, deleteEvacuationGuideline, getEvacuationGuidelineById, getEvacuationGuidelines, updateEvacuationGuideline } from '../controllers/evacuation.guidelines.controller.js';
import multer from 'multer';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Route for creating a new evacuation guideline with GLB file upload
router.post('/evacuation-guidelines', upload.single('glbfile'), createEvacuationGuideline);

// Route for getting all evacuation guidelines
router.get('/evacuation-guidelines', getEvacuationGuidelines);

// Route for getting a single evacuation guideline by ID
router.get('/evacuation-guidelines/:id', getEvacuationGuidelineById);

// Route for updating a single evacuation guideline by ID
router.put('/evacuation-guidelines/:id', upload.single('glbfile'), updateEvacuationGuideline);

// Route for deleting a single evacuation guideline by ID
router.delete('/evacuation-guidelines/:id', deleteEvacuationGuideline);

export default router;
