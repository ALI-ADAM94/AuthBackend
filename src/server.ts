// import basic libs
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from './routes/auth.route';
dotenv.config();
const app =express();
const PORT = process.env.PORT||5000;

connectDB();
//Middleware 
app.use(express.json());
app.use("/api/auth",authRoutes);


// server listen
app.listen(PORT,()=>{
    console.log(`Server is Running on  http://localhost:${PORT}`);
})
