import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema({
  tags: {
    type: [String],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Preferences =
  mongoose.models.Preferences ||
  mongoose.model("Preferences", preferencesSchema);
