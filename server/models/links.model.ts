import mongoose from "mongoose";

const linksSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    originalLink: {
      type: String,
      required: true,
    },
    shortLink: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Links", linksSchema);
