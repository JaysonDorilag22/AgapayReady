import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRouter from './routes/test.route.js'
import  userRouter from './routes/user.route.js';
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

  //Routers
  app.use('/api/test', testRouter);
  app.use('/api/user', userRouter);




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
