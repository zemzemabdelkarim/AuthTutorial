import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from "cookie-parser";

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

app.use(express.json());
app.use(cookieParser());


app.listen(PORT, () => {
  console.log(`server is listenning on port ${PORT}`);
});

app.use('/api/user/', userRoutes);
app.use("/api/auth", authRoutes);

app.use('/api/public',express.static('api/public'));

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error!";
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode
  });
});