import mongoose from "mongoose";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import { getTaskById, IsOldTitle } from "../common/task.js";
import { ApiResponse } from "../common/ApiResponse.js";
import { uploadMultipleFiles } from "../common/cloudinary.js";
import { getUserById } from "../common/user.js";
import { getTaskComments } from "../common/comment.js";  
import { countDocumentsInFolder } from "../common/cloudinary.js";

const isEmptyString = (str) => {
    return !str || str.trim() === '';
};

export const createTask = async (req, res) => {
    const task = req.body;
    const userId = req.user.cdui;
    try {
      //only admins can crerate a taqsk
      if (!["admin"].includes(req.user.cdrn)) {
        return res.status(403).json(ApiResponse(false, "Only Admins can create Tasks ", null));
      }

      //data validation
      if (isEmptyString(task.title) || isEmptyString(task.description)) {
        return res.status(400).json(ApiResponse(false, "Empty strings in the request", null));
      }

      // check if task with same title exists
      if (await IsOldTitle(task.title)) {
        return res.status(400).json(ApiResponse(false, "Task with this title already exists", null));
      }

      // Check for files ....
      // if (!req.files || req.files.length === 0) {
      //   //console.log("files not uploaded");
      //   return res.status(400).json(ApiResponse(false, "Files not uploaded", null));
      // }

      const results = await uploadMultipleFiles(req.files);
      if (!results) {
        return res.status(400).json(ApiResponse(false, "Files not uploaded to cloudinary", null));
      }

      const attachments = results.map(file => ({
        attachmentUrl: file.secure_url,
        publicId: file.public_id
      }));

      const newTask = new Task({
        ...task,
        createdBy: userId,
        modifiedBy: userId,
        attachments: attachments
      });

      const taskObj = await newTask.save();

      if (task.assignedUsers && Array.isArray(task.assignedUsers)) {
        const notifications = task.assignedUsers.map((userId) => ({
          description: `Admin assigned you a task`,
          taskId: taskObj._id,
          userId: userId, // The user being notified
        }));
  
        await Notification.insertMany(notifications);
      }


      return res.status(201).json(ApiResponse(true, "Task Created", null));
   
    } catch (error) {
      return res.status(500).json(ApiResponse(false, error.message, null));
    }
};

export const getTask = async (req, res) => {
    const taskId = req.query.id;
    try {
      const task = await Task.findById(taskId);
      const taskCreator = await getUserById(task.createdBy);

      if (!task) return res.status(404).json(ApiResponse(true, "Task nto Found", taskDto));
      if (!taskCreator) return res.status(404).json(ApiResponse(true, "User who created this task not Found", taskDto));

      
      const taskComments = await getTaskComments(taskId);
      const taskTags = task.tags.toString().split(',');
      const taskDto = {
        title: task.title,
        description: task.description,
        tags: taskTags,
        attachments: task.attachments.map(attachment => attachment.attachmentUrl),
        status: task.status,
        assignedUsers: await Promise.all(task.assignedUsers.map(async (userId) => {
            const user = await getUserById(userId);
            return {
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              gender: user.gender,
              profileImage: user.profileImage.imageURL
            };
        })),
        comments: taskComments,
        createdBy: taskCreator.fullName,  
        createdAt: task.createdAt,
      };
      
      return res.status(200).json(ApiResponse(true, "Task fetched successfully", taskDto));
    } catch (error) {
      console.log(error);
        return res.status(500).json(ApiResponse(false, "Could not fetch task", null));
    }
};

export const getAllTasks = async (req, res) => {
  try {
      const tasks = await Task.find();

      const taskDetails = await Promise.all(tasks.map(async (task) => {
          const user = await getUserById(task.createdBy);
          return {
              id: task.id,
              title: task.title,
              description: task.description,
              status: task.status,
              createdAt: task.createdAt,
              createdBy: user ? user.fullName : "Jhon Doe",
          };
      }));

      res.status(200).json(ApiResponse(true, "Tasks fetched successfully", taskDetails));
  } catch (error) {
      res.status(500).json(ApiResponse(false, "Could not fetch tasks", null));
  }
};


export const updateTask = async (req, res) => {
  const { taskId, title, description } = req.body;
  const userId = req.user.cdui;
  try {
      const task = await getTaskById(taskId);
      if (!task) return res.status(404).json(ApiResponse(false, "Task not found", null));

      if (title) {
        task.title = title;
      }
      if (description) {
        task.description = description;
      }

      if (req.files && req.files.length > 0) {
          const results = await uploadMultipleFiles(req.files);
          if (!results) {
              return res.status(400).json(ApiResponse(false, "Files not uploaded to cloudinary", null));
          }

          const newAttachments = results.map(file => ({
              attachmentUrl: file.secure_url,
              publicId: file.public_id
          }));

          task.attachments.push(...newAttachments);
      }
      task.modifiedBy = userId;

      await task.save();
      return res.status(200).json(ApiResponse(true, "Task updated successfully", task));
  } catch (error) {
    console.error(error);
    return res.status(500).json(ApiResponse(false, "Could not update task", null));
  }
};

export const updateTaskStatus = async (req, res) => {
    const { taskId, status } = req.body;
    try {
        const task = await getTaskById(taskId);
        if (!task) return res.status(404).json(ApiResponse(true, "Task not found", null));

        task.status = status;
        await task.save();

        res.status(200).json(ApiResponse(true, "Tasks fetched successfully", null));
    } catch (error) {
        res.status(500).json(ApiResponse(true, error.message, null));
    }
};


export const updateAssignedUsers = async (req, res) => {
    const { taskId, assignedUsers } = req.body;
    try {
      const task = await getTaskById(taskId);
      if (!task) return res.status(404).json(ApiResponse(false, "Task not found", null));
        
      task.assignedUsers = assignedUsers;
      await task.save();

      return res.status(201).json(ApiResponse(true, "Task updated successfully", null));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


export const deleteTask = (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id !== parseInt(id));
    res.status(204).send();
};


export const totalTaskCount = async (req, res) => {
    try {
        const count = await Task.countDocuments();
        res.status(200).json(ApiResponse(true, "Task Count Fetched", count));
    } catch (error) {
        res.status(500).json(ApiResponse(false, "Task Count was not fetched", null));
    }
};

export const totalCompletedTasks = async (req, res) => {
    try {
        const count = await Task.countDocuments({ status: 'Completed' });
        res.status(200).json(ApiResponse(true, "Completed Tasks fetched!", count));
    } catch (error) {
        res.status(500).json(ApiResponse(false, "Could not fetch Completed Tasks", null));
    }
};

export const totalTaskDocuments = async (req, res) => {
  try {
    const count = await countDocumentsInFolder();
    res.status(200).json(ApiResponse(true, "Documents Count Fetched", count));
  }
  catch (error){
    res.status(500).json(ApiResponse(false, "Documents Count was not fetched", null));
  }
}

export const getRecentTasks = async (req, res) => {
  try {
      const tasks = await Task.find().sort({ createdAt: -1 }).limit(5);
      const formattedTasks = await Promise.all(tasks.map(async task => {
          const user = await getUserById(task.createdBy);
          return {
              id: task.id,
              title: task.title,
              createdAt: task.createdAt,
              createdBy: task.createdBy,
              author: user ? user.fullName : 'Unknown',
              authorImage: user ? user.profileImage.imageURL : null
          };
      }));
      return res.status(200).json(ApiResponse(true, "Recent comments fetched successfully", formattedTasks));
  } catch (error) {
      return res.status(500).json(ApiResponse(false, "Could not fetch recent comments", null));
  }
};
