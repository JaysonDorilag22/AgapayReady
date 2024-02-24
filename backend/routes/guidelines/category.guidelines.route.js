import express from 'express';
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategoryById } from '../../controllers/guidelines/category.guidelines.controller.js';
import multer from 'multer';
import { verifyToken } from '../../middleware/verify.js';
import { isAdmin } from '../../middleware/isAdmin.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/categories', upload.single('image'), verifyToken, isAdmin, createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', upload.single('image'), verifyToken, isAdmin, updateCategoryById);
router.delete('/categories/:id', verifyToken, isAdmin, deleteCategoryById);

export default router;
