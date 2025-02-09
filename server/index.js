import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import userRoutes from './routes/user.js';
import taskRoutes from './routes/task.js';
import commentRoutes from './routes/comment.js'
import notificationRoutes from './routes/notification.js'

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_url: process.env.CLOUDINARY_URL
});

app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/comment', commentRoutes);
app.use('/notification', notificationRoutes)

const CONNECTION_URL = process.env.CONNECTION_STRING
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
.catch((error) => console.log(`Connection error: ${error.message}`));