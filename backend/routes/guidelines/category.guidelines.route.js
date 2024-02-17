import express from 'express';
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategoryById } from '../../controllers/guidelines/category.guidelines.controller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/categories', upload.single('image'), createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', upload.single('image'), updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);

export default router;
