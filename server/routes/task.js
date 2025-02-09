import express from "express";
import { createTask, getTask, getAllTasks, updateTask,updateTaskStatus, updateAssignedUsers, deleteTask, totalTaskCount, totalCompletedTasks, totalTaskDocuments, getRecentTasks } from "../controllers/task.js";
import { verifyToken } from "../common/tokenization.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post('/create', verifyToken, upload.array('files'), createTask);
router.get('/TaskDetail', verifyToken, getTask);
router.get('/all', verifyToken, getAllTasks);
router.put('/update', verifyToken,upload.array('files'), updateTask);
router.put('/updateStatus', verifyToken, updateTaskStatus);
router.put('/assignedUsers',verifyToken, updateAssignedUsers);
router.delete('/delete/:id',verifyToken, deleteTask);
router.get('/totalTasks',verifyToken, totalTaskCount);
router.get('/completedTasks',verifyToken, totalCompletedTasks);
router.get('/totalDocuments',verifyToken, totalTaskDocuments);
router.get('/recentTasks',verifyToken, getRecentTasks);


export default router;