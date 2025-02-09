import mongoose from "mongoose";
import baseSchema from "./baseSchema.js";

const commentSchema = new mongoose.Schema({
  description: { type: String, required: true },
  taskId: { type: String, required: true },
  taskName: { type: String, required: false },
  author: { type: String, required: false },
  authorImage: { type: String, required: false },
});

commentSchema.add(baseSchema);

const Comment = mongoose.model('Comment', commentSchema, 'Comment');
export default Comment;
