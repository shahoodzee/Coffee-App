import mongoose from "mongoose";

const identitySchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
  isPhoneConfirmed: { type: Boolean, default: false },
  isEmailConfirmed: { type: Boolean, default: false },
  wrongPasswordCount: { type: Number, default: 0 },
  lockoutEnabled: { type: Boolean, default: false },
});

export default identitySchema;