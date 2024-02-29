// routes/emergencyRoutes.js

import express from 'express';
import { createEmergencyReport, getAllEmergencyReports } from '../controllers/emergencyReport.controller.js';
import multer from 'multer';
import { verifyToken } from '../middleware/verify.js';
import { isAdmin } from '../middleware/isAdmin.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/report', upload.single('image'), verifyToken, createEmergencyReport);
router.get('/report', verifyToken, isAdmin, getAllEmergencyReports);


export default router;
