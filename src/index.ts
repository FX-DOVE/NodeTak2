import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./databaseconnection/dbconnect";
import Routh from "./router/Router";
import logRequests from "./middleware/loggingMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logRequests);

app.use("/api", Routh);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}/api/notes`);
});
