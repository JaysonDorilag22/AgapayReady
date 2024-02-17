import express from 'express';
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategoryById } from '../../controllers/guidelines/category.guidelines.controller.js';
import multer from 'multer';

const router = express.Router();

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Destination folder for temporarily storing uploaded files

// Route for creating a new category with image upload
router.post('/categories', upload.single('image'), createCategory);

// Route for getting all categories
router.get('/categories', getAllCategories);

// Route for getting a single category by ID
router.get('/categories/:id', getCategoryById);

// Route for updating a category by ID with image upload
router.put('/categories/:id', upload.single('image'), updateCategoryById);

// Route for deleting a category by ID
router.delete('/categories/:id', deleteCategoryById);

export default router;
