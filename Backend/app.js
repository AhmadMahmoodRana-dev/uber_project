import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./db/db.js";
import mainRoutesFunction from "./routes/main.routes.js";
import cookieParser from "cookie-parser";

// FUNCTIONS
const app = express();
connectDb();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true, // or specify your frontend URL
  credentials: true
}));

mainRoutesFunction(app);

export default app;
