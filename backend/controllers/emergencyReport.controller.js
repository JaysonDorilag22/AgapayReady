import EmergencyReport from "../models/report.model.js";
import User from "../models/user.model.js";
import { io, connectedUsers } from '../index.js'; // Importing connectedUsers map from index.js
import cloudinary from 'cloudinary';
import moment from 'moment';

export const createEmergencyReport = async (req, res) => {
  try {
    const { location, description, userId } = req.body; 

    const image = req.file.path; 
    const uploadedImage = await cloudinary.v2.uploader.upload(image);

    const newEmergencyReport = new EmergencyReport({
      location,
      description,
      image: uploadedImage.secure_url,
      user: userId 
    });
    
    await newEmergencyReport.save();

    io.emit('newEmergencyReport', newEmergencyReport);


    res.status(201).json({ message: 'Emergency report created successfully' });
  } catch (error) {
    console.error('Error creating emergency report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const confirmEmergencyReport = async (req, res) => {
  try {
    const { reportId, userId } = req.body;

    const report = await EmergencyReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    report.confirmed = true;
    await report.save();
    
    const userSocketId = getUserSocketId(userId);
    if (userSocketId) {
      // Emitting report confirmation notification to the user
      io.to(userSocketId).emit('notification', { message: 'Your report has been confirmed!' });
    }

    res.status(200).json({ message: 'Emergency report confirmed successfully' });
  } catch (error) {
    console.error('Error confirming emergency report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllEmergencyReports = async (req, res) => {
  try {
    const reports = await EmergencyReport.find();
    res.json(reports);
  } catch (error) {
    console.error('Error fetching emergency reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEmergencyReportsCount = async (req, res) => {
  try {
    // Calculate the date three months ago
    const threeMonthsAgo = moment().subtract(3, 'months').toDate();

    // Query MongoDB for emergency reports created after the calculated date
    const count = await EmergencyReport.countDocuments({ createdAt: { $gte: threeMonthsAgo } });

    res.json({ count });
  } catch (error) {
    console.error('Error fetching emergency reports count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function getUserSocketId(userId) {
  return connectedUsers.get(userId) || null;
}


function emitConfirmationNotification(userSocketId, reportId) {
  io.to(userSocketId).emit('reportConfirmed', { reportId });
  io.to(userSocketId).emit('notification', { message: 'Your report has been confirmed!' });
}
