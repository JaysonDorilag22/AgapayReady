import express from 'express';
import { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment,getUsersPerDepartment,getReportsPerDepartment  } from '../controllers/department.controller.js';
import { verifyToken } from '../middleware/verify.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/departments', verifyToken, isAdmin, createDepartment);
router.get('/departments', getAllDepartments);
router.get('/department/:id', getDepartmentById);
router.put('/departments/:id',verifyToken, isAdmin, updateDepartment);
router.delete('/departments/:id',verifyToken, isAdmin, deleteDepartment);

router.get('/users-per-department', getUsersPerDepartment);
router.get('/reports-per-department', getReportsPerDepartment);

export default router;
