import express from "express";
import { fetchAllNotifications, readAllNotifications, readNotification, userNotificationCount } from "../controllers/notification.js";
import { verifyToken } from "../common/tokenization.js";

const router = express.Router();

router.get('/getNotifications', verifyToken, fetchAllNotifications);
router.put('/readNotification', verifyToken, readNotification);
router.get('/readAllNotifications', verifyToken, readAllNotifications);
router.get('/userNotificationCount', verifyToken, userNotificationCount);

export default router;