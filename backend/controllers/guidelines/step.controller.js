import Step from '../../models/steps.model.js';
import cloudinary from 'cloudinary';
import { errorHandler } from '../../utils/error.js';


// Create a new step
export const createStep = async (req, res) => {
    try {
        const { stepNumber, description, guideline } = req.body;
        let { imageUrl } = req.body;

        // Check if image is provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        // Create new step instance
        const newStep = new Step({
            stepNumber,
            description,
            imageUrl,
            guideline
        });

        // Save the step to the database
        const savedStep = await newStep.save();

        res.status(201).json(savedStep);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Get all steps
export const getAllSteps = async (req, res) => {
    try {
        const steps = await Step.find();
        res.status(200).json(steps);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Get a single step by ID
export const getStepById = async (req, res) => {
    try {
        const { id } = req.params;
        const step = await Step.findById(id);
        if (!step) {
            return res.status(404).json({ message: "Step not found" });
        }
        res.status(200).json(step);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Update a step by ID
export const updateStepById = async (req, res) => {
    try {
        const { id } = req.params;
        const { stepNumber, description, guideline } = req.body;
        let { imageUrl } = req.body;

        const step = await Step.findById(id);
        if (!step) {
            return res.status(404).json({ message: "Step not found" });
        }

        // Check if image is provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        // Update step fields
        step.stepNumber = stepNumber;
        step.description = description;
        step.imageUrl = imageUrl;
        step.guideline = guideline;

        // Save the updated step
        const updatedStep = await step.save();

        res.status(200).json(updatedStep);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Delete a step by ID
export const deleteStepById = async (req, res) => {
    try {
        const { id } = req.params;
        const step = await Step.findByIdAndDelete(id);
        if (!step) {
            return res.status(404).json({ message: "Step not found" });
        }
        res.status(200).json({ message: "Step deleted successfully" });
    } catch (error) {
        errorHandler(res, error);
    }
};
