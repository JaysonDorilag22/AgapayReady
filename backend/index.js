import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinary from 'cloudinary';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import emergencyReportRouter from './routes/emergencyReport.route.js'
import testRouter from './routes/test.route.js'
import userRouter from './routes/user.route.js';
import contactRouter from './routes/contacts/contacts.route.js'
import guidelineRouter from './routes/guidelines/guidelines.route.js'
import stepRouter from './routes/guidelines/step.route.js'
import departmentRouter from './routes/department.route.js';
import categoryGuidelinesRouter from './routes/guidelines/category.guidelines.route.js';
import categoryContactsRouter from "./routes/contacts/category.contacts.route.js";
import cookieParser from "cookie-parser";

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

app.use(cors());
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/v1', testRouter);
app.use('/api/v1', contactRouter);
app.use('/api/v1', guidelineRouter);
app.use('/api/v1', stepRouter);

app.use('/api/v1', departmentRouter);
app.use('/api/v1', categoryGuidelinesRouter);
app.use('/api/v2', categoryContactsRouter);

app.use('/api/v1', userRouter);
app.use('/api/v1', emergencyReportRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const connectedUsers = new Map(); // Map to store user IDs and their corresponding socket IDs

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user authentication and associate socket with user ID
  socket.on('authenticate', (userId) => {
    // Assuming you have authenticated the user and received their ID
    // Associate the socket ID with the user ID
    connectedUsers.set(userId, socket.id);
    console.log(`User authenticated: ${userId}`);
  });

  socket.on('disconnect', () => {
    // Remove the user ID from the map when the socket disconnects
    connectedUsers.forEach((value, key) => {
      if (value === socket.id) {
        connectedUsers.delete(key);
        console.log(`User disconnected: ${key}`);
      }
    });
  });
});

export { io, connectedUsers };

