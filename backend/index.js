import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinary from 'cloudinary';
import cors from 'cors';

import testRouter from './routes/test.route.js'
import userRouter from './routes/user.route.js';
import contactRouter from './routes/contacts/contacts.route.js'
import guidelineRouter from './routes/guidelines/guidelines.route.js'
import stepRouter from './routes/guidelines/step.route.js'

//categories
import departmentRouter from './routes/department.route.js';
import categoryGuidelinesRouter from './routes/guidelines/category.guidelines.route.js';
import categoryContactsRouter from "./routes/contacts/category.contacts.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use('/api/v1', testRouter);
app.use('/api/v1', contactRouter);
app.use('/api/v1', guidelineRouter);
app.use('/api/v1', stepRouter);

// Categories
app.use('/api/v1', departmentRouter);
app.use('/api/v1', categoryGuidelinesRouter);
app.use('/api/v2', categoryContactsRouter);

// User
app.use('/api/v1', userRouter);

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


