import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
