import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("mongodb connected!");
  })
  .catch((err) => {
    console.log(`an error occured during connection to database!!\n\t${err}`);
  });

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
  console.log(`server is listenning on port ${PORT}`);
});

app.use('/api/user/', userRoutes);