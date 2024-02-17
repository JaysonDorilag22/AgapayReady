import express from 'express';
import { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment  } from '../controllers/department.controller.js';

const router = express.Router();

router.post('/departments', createDepartment);
router.get('/departments', getAllDepartments);
router.get('/departments/:id', getDepartmentById);
router.put('/departments/:id', updateDepartment);
router.delete('/departments/:id', deleteDepartment);

export default router;
