import Task from "../models/Task.js";


export const IsOldTitle = async (title) => {
    try {
        const task = await Task.findOne({ title });
        return task !== null;
    } catch (error) {
        throw new Error('Error finding task by title');
    }
};


export const getTaskById = async (id) => {
    try {
        const task = await Task.findById(id);
        return task;
    } catch (error) {
        throw new Error('Error finding task by ID');
    }
};
