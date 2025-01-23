import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./db/db.js";
import mainRoutesFunction from "./routes/main.routes.js";

// FUNCTIONS
const app = express();
connectDb();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mainRoutesFunction(app);



export default app;
