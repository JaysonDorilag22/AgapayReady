import EvacuationGuidelines from "../models/evacuation.guidelines.model.js";
import cloudinary from 'cloudinary';


// Create a new evacuation guideline
export const createEvacuationGuideline = async (req, res) => {
  try {
    const { name, tips } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const newGuideline = new EvacuationGuidelines({ name, glbfile: result.secure_url, tips });
    const savedGuideline = await newGuideline.save();
    res.status(201).json(savedGuideline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all evacuation guidelines
export const getEvacuationGuidelines = async (req, res) => {
  try {
    const guidelines = await EvacuationGuidelines.find();
    res.status(200).json(guidelines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single evacuation guideline by ID
export const getEvacuationGuidelineById = async (req, res) => {
  try {
    const guideline = await EvacuationGuidelines.findById(req.params.id);
    if (guideline) {
      res.status(200).json(guideline);
    } else {
      res.status(404).json({ message: "Evacuation guideline not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single evacuation guideline by ID
export const updateEvacuationGuideline = async (req, res) => {
  try {
    const { name, tips } = req.body;
    let updateFields = { name, tips };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateFields.glbfile = result.secure_url;
    }
    const updatedGuideline = await EvacuationGuidelines.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.status(200).json(updatedGuideline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a single evacuation guideline by ID
export const deleteEvacuationGuideline = async (req, res) => {
  try {
    await EvacuationGuidelines.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Evacuation guideline deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
