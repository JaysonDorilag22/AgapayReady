import express from 'express';
import categoryGuidelinesController from '../../controllers/guidelines/category.guidelines.controller.js';
import multer from 'multer';

const router = express.Router();

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Destination folder for temporarily storing uploaded files

// Route for creating a new category with image upload
router.post('/categories', upload.single('image'), categoryGuidelinesController.createCategory);

// Route for getting all categories
router.get('/categories', categoryGuidelinesController.getAllCategories);

// Route for getting a single category by ID
router.get('/categories/:id', categoryGuidelinesController.getCategoryById);

// Route for updating a category by ID with image upload
router.put('/categories/:id', upload.single('image'), categoryGuidelinesController.updateCategoryById);

// Route for deleting a category by ID
router.delete('/categories/:id', categoryGuidelinesController.deleteCategoryById);

export default router;
