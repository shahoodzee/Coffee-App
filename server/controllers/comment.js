import Comment from "../models/Comments.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import { ApiResponse } from "../common/ApiResponse.js";
import { getTaskById } from "../common/task.js";

export const createComment = async (req, res) => {
    const { description, taskId } = req.body;
    const userId = req.user.cdui;

    try {
        if (!description || description.trim() === '') {
            return res.status(400).json(ApiResponse(false, "Comment content cannot be empty", null));
        }
        const task = await getTaskById(taskId);
        //console.log(task); 
        const user = await User.findById(userId);
        //console.log(user);

        if (task && user) {
            const newComment = new Comment({
                description: description,
                taskId: taskId,
                taskName: task.title,
                createdBy: userId,
                modifiedBy: userId,
                author: user.fullName,
                createdAt: new Date(),
                modifiedAt: new Date(),
                authorImage: user.profileImage.imageURL
            });
            await newComment.save();
            const commentObj = {
                id: newComment.id,
                description: newComment.description,
                author: newComment.author,
                authorImage: newComment.authorImage,
                createdAt: newComment.createdAt,
            }
            return res.status(201).json(ApiResponse(true, "Comment Created", commentObj));
        }

        return res.status(404).json(ApiResponse(false, "Task or User not found", null));
    } catch (error) {
        console.log(error);
        return res.status(500).json(ApiResponse(false, error.message, null));
    }
};

export const getTaskComments = async (req, res) => {
    const { taskId } = req.body;

    try {
        const comments = await Comment.find({ taskId }).sort({ createdAt: -1 });
        const formattedComments = comments.map(comment => ({
            description: comment.description,
            author: comment.author,
            authorImage: comment.authorImage,
            createdBy: comment.createdBy,
            taskName: comment.taskName,
            createdAt: comment.createdAt
        }));
        return res.status(200).json(ApiResponse(true, "Comments fetched successfully", formattedComments));
    } catch (error) {
        return res.status(500).json(ApiResponse(false, "Could not fetch comments", null));
    }
};

export const getRecentComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 }).limit(3);
        const formattedComments = comments.map(comment => ({
            description: comment.description,
            author: comment.author,
            authorImage: comment.authorImage,
            createdBy: comment.createdBy,
            taskName: comment.taskName,
            taskId: comment.taskId,
            createdAt: comment.createdAt
        }));
        return res.status(200).json(ApiResponse(true, "Recent comments fetched successfully", formattedComments));
    } catch (error) {
        return res.status(500).json(ApiResponse(false, "Could not fetch recent comments", null));
    }
};
