import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: true },
});

export default mongoose.model("Category", categorySchema);
