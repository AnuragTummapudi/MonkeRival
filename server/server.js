import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import {User} from "./models/userModel.js";

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


app.post("/update-score", async (req, res) => {
  const { userId, result } = req.body;

  if (!userId || !["win", "lose"].includes(result)) {
    return res.status(400).json({ message: "Invalid input." });
  }

  try {
    const scoreChange = result === "win" ? 30 : -30;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.score = (user.score || 0) + scoreChange;
    await user.save();

    res.status(200).json({ message: "Score updated.", newScore: user.score });
  } catch (err) {
    console.error("Score update error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
