import mongoose from "mongoose";

const otpsSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, expires: "3m", default: Date.now },
});

export default mongoose.model("Otps", otpsSchema);
