// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

 const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI ||'');
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log("MongoDB Connected Successfully")
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit(1);
  }
};
export default connectDB;
