import Notification from "../models/Notification";

export const createNotification = async (notificationObj) => {
    const { description, author, taskId, userId } = notificationObj;
    try {
        const newNotification = new Notification({
            description,
            author,
            taskId,
            userId
        });

        await newNotification.save();
        return true;
    } catch (error) {
        // console.error(error.message);
        return false;
    }
};
