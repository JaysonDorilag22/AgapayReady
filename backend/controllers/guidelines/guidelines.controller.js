import Guideline from '../../models/guidelines.model.js';
import Step from '../../models/steps.model.js';
import cloudinary from 'cloudinary';
import { errorHandler } from '../../utils/error.js';

// Create a new guideline
export const createGuideline = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        let { image } = req.body;

        // Check if image is provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure_url;
        }

        // Create new guideline instance
        const newGuideline = new Guideline({
            name,
            description,
            image,
            category
        });

        // Save the guideline to the database
        const savedGuideline = await newGuideline.save();

        res.status(201).json(savedGuideline);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Get all guidelines
export const getAllGuidelines = async (req, res) => {
    try {
        const guidelines = await Guideline.find();
        res.status(200).json(guidelines);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Get a single guideline by ID
export const getGuidelineById = async (req, res) => {
    try {
        const { id } = req.params;
        const guideline = await Guideline.findById(id);
        if (!guideline) {
            return res.status(404).json({ message: "Guideline not found" });
        }
        res.status(200).json(guideline);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Update a guideline by ID
export const updateGuidelineById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category } = req.body;
        let { image } = req.body;

        // Check if image is provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure_url;
        }

        const guideline = await Guideline.findById(id);
        if (!guideline) {
            return res.status(404).json({ message: "Guideline not found" });
        }

        // Update guideline fields
        guideline.name = name;
        guideline.description = description;
        guideline.image = image;
        guideline.category = category;

        // Save the updated guideline
        const updatedGuideline = await guideline.save();

        res.status(200).json(updatedGuideline);
    } catch (error) {
        errorHandler(res, error);
    }
};

export const getGuidelineWithSteps = async (req, res) => {
  try {
      const { id } = req.params;

      // Find the guideline by ID
      const guideline = await Guideline.findById(id);

      if (!guideline) {
          return res.status(404).json({ message: "Guideline not found" });
      }

      // Find all steps associated with the guideline
      const steps = await Step.find({ guideline: id });

      res.status(200).json({ guideline, steps });
  } catch (error) {
      errorHandler(res, error);
  }
};

// Delete a guideline by ID
export const deleteGuidelineById = async (req, res) => {
    try {
        const { id } = req.params;
        const guideline = await Guideline.findByIdAndDelete(id);
        if (!guideline) {
            return res.status(404).json({ message: "Guideline not found" });
        }
        res.status(200).json({ message: "Guideline deleted successfully" });
    } catch (error) {
        errorHandler(res, error);
    }
};
