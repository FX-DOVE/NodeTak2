import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./databaseconnection/dbconnect";
import noteRoutes from "./router/noteRoutes";
import authRoutes from "./router/authRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} access it here ==> http://localhost:8000/api/auth/login`));



