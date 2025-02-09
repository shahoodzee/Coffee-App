import Comment from "../models/Comments.js";


export const getTaskComments = async (taskId) => {
    try {
        const comments = await Comment.find({ taskId });
        return comments.map(comment => ({
            id: comment.id,
            description: comment.description,
            author: comment.author,
            authorImage: comment.authorImage,
            createdAt: comment.createdAt
        }));
    } catch (error) {
        console.log(error);
        return null;
    }
};
