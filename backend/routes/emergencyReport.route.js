// routes/emergencyRoutes.js

import express from 'express';
import { createEmergencyReport, getAllEmergencyReports } from '../controllers/emergencyReport.controller.js';

const router = express.Router();

router.post('/report', createEmergencyReport);
router.get('/report', getAllEmergencyReports);


export default router;
