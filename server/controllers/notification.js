import { ApiResponse } from "../common/ApiResponse.js";
import Notification from "../models/Notification.js";

export const fetchAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.cdui });
        return res.status(200).json(ApiResponse(true, "User Notifications Fetched", notifications));
    } catch (error) {
        return res.status(500).json(ApiResponse(false, error.message, null));
    }
};

export const readNotification = async (req, res) => {
    const id = req.query.id;
    const userid = req.user.cdui;
    try {
        const notification = await Notification.findOne({ _id: id, userId: userid });
        if (notification) {
            notification.isRead = true;
            await notification.save();
            return res.status(200).json(ApiResponse(true, "Notification Read Successfully", null));
        }
        else {
            return res.status(404).json(ApiResponse(false, "Notification not found", null));
        }
    } catch (error) {
        return res.status(500).json(ApiResponse(false, error.message, null));
    }
};
export const readAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.cdui });
        if (!notifications.length) {
            return res.status(404).json(ApiResponse(false, "No notifications found", null));
        }
        await Notification.updateMany({ userId: req.user.cdui }, { isRead: true });
        return res.status(200).json(ApiResponse(true, "Notifications All Read", null));
    } catch (error) {
        return res.status(500).json(ApiResponse(false, error.message, null));
    }
};

export const userNotificationCount = async (req, res) => {
    try {
        const count = await Notification.countDocuments({ userId: req.user.cdui, isRead: false });
        return res.status(200).json(ApiResponse(true, "Notification Count Fetched", count));
    } catch (error) {
        return res.status(500).json(ApiResponse(false, error.message, null));
    }
};



