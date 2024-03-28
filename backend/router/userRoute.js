import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
// chainage de route vu la meme route /profile avec authentication du cookie 
router.route('/profile').get(protect ,getUserProfile).put(protect ,updateUserProfile);

export default router;