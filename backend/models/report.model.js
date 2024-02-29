import mongoose from 'mongoose';

const emergencyReportSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String, 
    required: true
  }
});

const EmergencyReport = mongoose.model('EmergencyReport', emergencyReportSchema);

export default EmergencyReport;
