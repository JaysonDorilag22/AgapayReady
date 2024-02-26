import EmergencyReport from "../models/report.model.js";
import { io } from '../index.js'; // Assuming you have exported the io instance from your app.js file

export const createEmergencyReport = async (req, res) => {
  try {
    const { location, description } = req.body;
    const newEmergencyReport = new EmergencyReport({
      location,
      description
    });
    await newEmergencyReport.save();

    // Emit the new emergency report to all connected clients
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