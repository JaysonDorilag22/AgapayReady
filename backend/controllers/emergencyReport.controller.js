import EmergencyReport from "../models/report.model.js";
import { io } from '../index.js';
import cloudinary from 'cloudinary';

export const createEmergencyReport = async (req, res) => {
  try {
    const { location, description } = req.body;

    const image = req.file.path; 
    const uploadedImage = await cloudinary.v2.uploader.upload(image);

    const newEmergencyReport = new EmergencyReport({
      location,
      description,
      image: uploadedImage.secure_url 
    });
    
    await newEmergencyReport.save();

    io.emit('newEmergencyReport', newEmergencyReport);

    res.status(201).json({ message: 'Emergency report created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllEmergencyReports = async (req, res) => {
    try {
      const reports = await EmergencyReport.find();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };