// routes/emergencyRoutes.js

import express from 'express';
import { confirmEmergencyReport, createEmergencyReport, getAllEmergencyReports,getEmergencyReportsCount } from '../controllers/emergencyReport.controller.js';
import multer from 'multer';
import { verifyToken } from '../middleware/verify.js';
import { isAdmin } from '../middleware/isAdmin.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/report', upload.single('image'), verifyToken, createEmergencyReport);
router.get('/report', verifyToken, isAdmin, getAllEmergencyReports);
router.get('/reports-three-months', verifyToken, isAdmin, getEmergencyReportsCount);
router.post('/report-confirm', verifyToken, isAdmin, confirmEmergencyReport);



export default router;
