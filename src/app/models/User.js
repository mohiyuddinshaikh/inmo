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
  profileImage: {
    type: String,
    default: "",
  },
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Preferences",
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
