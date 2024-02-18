import Guideline from '../../models/guidelines.model.js';
import cloudinary from 'cloudinary';

// Function to handle errors
const handleErrors = (err) => {
  console.error(err);
  // You can handle errors based on your application's requirements
};

// Create a new guideline
export const createGuideline = async (req, res) => {
  try {
    const { name, description, category, steps } = req.body;
    // Upload image to Cloudinary if provided
    let imageUrl;
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }
    const newGuideline = new Guideline({
      name,
      description,
      image: imageUrl,
      category,
      steps
    });
    const savedGuideline = await newGuideline.save();
    res.status(201).json(savedGuideline);
  } catch (err) {
    handleErrors(err);
    res.status(400).json({ error: 'Failed to create guideline' });
  }
};

// Get all guidelines
export const getAllGuidelines = async (req, res) => {
  try {
    const guidelines = await Guideline.find();
    res.status(200).json(guidelines);
  } catch (err) {
    handleErrors(err);
    res.status(500).json({ error: 'Failed to retrieve guidelines' });
  }
};

// Get a single guideline by ID
export const getGuidelineById = async (req, res) => {
  try {
    const { id } = req.params;
    const guideline = await Guideline.findById(id);
    if (!guideline) {
      return res.status(404).json({ error: 'Guideline not found' });
    }
    res.status(200).json(guideline);
  } catch (err) {
    handleErrors(err);
    res.status(500).json({ error: 'Failed to retrieve guideline' });
  }
};

// Update a guideline by ID
export const updateGuidelineById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, steps } = req.body;
    const updatedData = {};
    if (name) updatedData.name = name;
    if (description) updatedData.description = description;
    if (category) updatedData.category = category;
    if (steps) updatedData.steps = steps;
    // Update image if provided
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      updatedData.image = result.secure_url;
    }
    const updatedGuideline = await Guideline.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedGuideline);
  } catch (err) {
    handleErrors(err);
    res.status(500).json({ error: 'Failed to update guideline' });
  }
};

// Delete a guideline by ID
export const deleteGuidelineById = async (req, res) => {
  try {
    const { id } = req.params;
    await Guideline.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    handleErrors(err);
    res.status(500).json({ error: 'Failed to delete guideline' });
  }
};
