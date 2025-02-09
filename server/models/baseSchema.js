import mongoose from "mongoose";

const baseSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: false, refPath: 'onModel' },
  modifiedAt: { type: Date, default: Date.now },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, required: false, refPath: 'onModel' },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

export default baseSchema;