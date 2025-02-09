import mongoose from "mongoose";
import baseSchema from "./baseSchema.js";

const notificationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  taskId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

notificationSchema.add(baseSchema);

const Notification = mongoose.model('Notification', notificationSchema, 'Notification');
export default Notification;
