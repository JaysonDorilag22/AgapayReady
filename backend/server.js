import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
