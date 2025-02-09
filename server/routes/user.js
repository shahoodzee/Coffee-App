import express from "express";
import { signUp, logOut, getUser, getUsers, logIn, getEmailConfirmation, getUserDetails, resetPassword, totalUserCount, editUser, deactivateUser } from "../controllers/user.js";
import { verifyToken } from "../common/tokenization.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get('/all', verifyToken, getUsers);
router.get('/getUser', verifyToken, getUser);
router.get('/getUserDetails/:id', verifyToken, getUserDetails);
router.get('/emailConfirmation', verifyToken, getEmailConfirmation);
router.get('/totalUsers',verifyToken, totalUserCount);
router.put('/edit', verifyToken, editUser);
router.put('/deactivate', verifyToken, deactivateUser);

router.post('/create', upload.single('image'), signUp);
router.post('/signIn', logIn);
router.post('/signOut', logOut);
router.post('/resetPassword', resetPassword);


export default router;