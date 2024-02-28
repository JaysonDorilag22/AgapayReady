import cloudinary from 'cloudinary';
import CategoryGuidelines from '../../models/category.guidelines.model.js';

export const createCategory = async (req, res) => {
  try {
    const { name, short_description, description } = req.body;
    const { path } = req.file;

    const uploadedImage = await cloudinary.uploader.upload(path);

    const newCategory = new CategoryGuidelines({
      name,
      short_description,
      description,
      image: uploadedImage.secure_url
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryGuidelines.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllCategoriesPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const categories = await CategoryGuidelines.find().skip(skip).limit(limit);
    const totalCategoryGuidelines = await CategoryGuidelines.countDocuments();

    res.status(200).json({
      categories,
      currentPage: page,
      totalPages: Math.ceil(totalCategoryGuidelines / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryGuidelines.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const { name, short_description, description } = req.body;
    let image = req.body.image;
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
};

export const deleteCategoryById = async (req, res) => {
  try {
    const category = await CategoryGuidelines.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const imageUrl = category.image;

    const deletedCategory = await CategoryGuidelines.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
