import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
const app = express();
const PORT = process.env.PORT || 4000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());
dotenv.config();


//Cloudinary
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

  //Routers
  app.use('/api/v1', testRouter);
  app.use('/api/v1', contactRouter);
  app.use('/api/v1', guidelineRouter);
  app.use('/api/v1', stepRouter);


  //categories
  app.use('/api/v1', departmentRouter);
  app.use('/api/v1', categoryGuidelinesRouter);
  app.use('/api/v2', categoryContactsRouter);

  //others
  app.use('/api/v1', userRouter);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});