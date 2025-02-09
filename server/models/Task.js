import mongoose from "mongoose";
import baseSchema from "./baseSchema.js";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Assigned'
  },
  assignedUsers: [{
    type: String,
  }],
  tags: [{
    type: String
  }],
  attachments: [{
    attachmentUrl: {
      type: String,
    },
    publicId: {
      type: String,
    }
  }]
});

taskSchema.add(baseSchema);

const Task = mongoose.model('Task', taskSchema, 'Task');
export default Task;
