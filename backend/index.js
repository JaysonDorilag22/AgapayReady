import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary';

import testRouter from './routes/test.route.js'
import userRouter from './routes/user.route.js';
import departmentRouter from './routes/department.route.js';
import categoryGuidelinesRouter from './routes/guidelines/category.guidelines.route.js';
import categoryContactsRouter from "./routes/contacts/category.contacts.route.js";
// import categoryContactsRouter from './routes/contacts/category.guidelines.route.js';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
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
  app.use('/api/v1', categoryGuidelinesRouter);
  app.use('/api/v2', categoryContactsRouter);

  app.use('/api/v1', userRouter);
  app.use('/api/v1', departmentRouter);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});