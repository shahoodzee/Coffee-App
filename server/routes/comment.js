import express from "express";
import { verifyToken } from "../common/tokenization.js";
import { createComment, getRecentComments, getTaskComments } from "../controllers/comment.js";

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/recentComments', verifyToken, getRecentComments);
router.get('/taskComments', verifyToken, getTaskComments);

export default router;