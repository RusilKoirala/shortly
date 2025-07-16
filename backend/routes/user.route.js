import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);
router.post('/logout', logoutUser);

export default router;
// I love user routes really i do
// I hope you love them too <3
// Please don't judge me for the comment quality, I'm still learning XD