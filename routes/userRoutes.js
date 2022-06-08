import express from 'express';
import {
  protect,
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/authController.js';
import {
  createUser,
  getMe,
  deleteMe,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);
router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.route('/register').post(createUser);

export default router;
