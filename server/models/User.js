import mongoose from "mongoose";
import baseSchema from "./baseSchema.js"
import identitySchema from "./identitySchema.js";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String,
  emailConfirmed: { type: Boolean, default: false },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  profileImage: {
    imageURL: { type: String, required: false },
    publicId: { type: String, required: false }
  },
  role: { type: String, default: 'user' },
  dateOfBirth: { type: Date, default: Date.now }
});

userSchema.add(baseSchema);
userSchema.add(identitySchema);

const User = mongoose.model('User', userSchema, 'User');
export default User;
