import cloudinary from 'cloudinary';
import CategoryGuidelines from '../../models/category.guidelines.model.js';

const categoryGuidelinesController = {
  // Create a new category with image upload to Cloudinary
  createCategory: async (req, res) => {
    try {
      const { name, short_description, description } = req.body;
      const { path } = req.file; // Assuming you're using multer or similar middleware for file uploads

      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(path);

      // Create category with image URL from Cloudinary
      const newCategory = new CategoryGuidelines({
        name,
        short_description,
        description,
        image: uploadedImage.secure_url // Store secure URL of the uploaded image
      });

      // Save category to database
      const savedCategory = await newCategory.save();

      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Read all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await CategoryGuidelines.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Read a single category by ID
  getCategoryById: async (req, res) => {
    try {
      const category = await CategoryGuidelines.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a category by ID with image update in Cloudinary
  updateCategoryById: async (req, res) => {
    try {
      const { name, short_description, description } = req.body;
      let image = req.body.image; // If image is not being updated, keep the existing image
      if (req.file) {
        const { path } = req.file;
        const uploadedImage = await cloudinary.uploader.upload(path);
        image = uploadedImage.secure_url;
      }

      const updatedCategory = await CategoryGuidelines.findByIdAndUpdate(
        req.params.id,
        { name, short_description, description, image },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a category by ID with image deletion from Cloudinary
  deleteCategoryById: async (req, res) => {
    try {
      // Find category to get image URL
      const category = await CategoryGuidelines.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      // Extract image URL
      const imageUrl = category.image;

      // Delete category from MongoDB
      const deletedCategory = await CategoryGuidelines.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      // Delete image from Cloudinary
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);

      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default categoryGuidelinesController;
