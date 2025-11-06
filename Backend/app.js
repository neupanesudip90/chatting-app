import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import allRoutes from "./routes/Routes.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

// CORS setup for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Use routes
app.use("/api", allRoutes);




export default app;
