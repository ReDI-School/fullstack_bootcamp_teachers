import mongoose from "mongoose";

// Book schema for MongoDB
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, default: "" },
  publishedYear: { type: Number },
  genre: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
