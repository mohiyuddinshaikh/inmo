import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Preferences",
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
