import express from 'express';
import multer from 'multer';
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategoryById } from '../../controllers/contacts/category.contacts.controller.js';
import { verifyToken } from '../../middleware/verify.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/categories', upload.single('image'), verifyToken, createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', upload.single('image'), updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);

export default router;
