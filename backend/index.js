import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRouter from './routes/test.route.js'
import  userRouter from './routes/user.route.js';
import categoryGuidelinesRouter from './routes/guidelines/category.guidelines.route.js';
import cloudinary from 'cloudinary';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
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
  app.use('/api/v1', userRouter);
  app.use('/api/v1', categoryGuidelinesRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});