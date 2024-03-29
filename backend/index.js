import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinary from 'cloudinary';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from "cookie-parser";

import emergencyReportRouter from './routes/emergencyReport.route.js';
import testRouter from './routes/test.route.js';
import userRouter from './routes/user.route.js';
import contactRouter from './routes/contacts/contacts.route.js';
import guidelineRouter from './routes/guidelines/guidelines.route.js';
import stepRouter from './routes/guidelines/step.route.js';
import departmentRouter from './routes/department.route.js';
import categoryGuidelinesRouter from './routes/guidelines/category.guidelines.route.js';
import categoryContactsRouter from "./routes/contacts/category.contacts.route.js";
import feedbackRouter from "./routes/feedback.route.js"
import searchRouter from "./routes/search.route.js"
import evacuationRouter from "./routes/evacuation.route.js"


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

// Routes
app.use('/api/v1', testRouter);
app.use('/api/v1', feedbackRouter);
app.use('/api/v1', contactRouter);
app.use('/api/v1', guidelineRouter);
app.use('/api/v1', stepRouter);
app.use('/api/v1', departmentRouter);
app.use('/api/v1', categoryGuidelinesRouter);
app.use('/api/v2', categoryContactsRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', emergencyReportRouter);
app.use('/api/v1', searchRouter);
app.use('/api/v1', evacuationRouter);



// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Socket.io Connection
const connectedUsers = new Map(); 
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export Socket.io instance and connected users map
export { io, connectedUsers };
