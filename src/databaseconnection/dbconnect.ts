// databaseconnection/dbconnect.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoURL as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

export default connectDB;
