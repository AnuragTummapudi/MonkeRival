import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    profilePic: String,
    score: Number
});

export const User = mongoose.model("User", userSchema);