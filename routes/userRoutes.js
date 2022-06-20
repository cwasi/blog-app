import express from 'express';
import {
  restrictTo,
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
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
  getAllUsers,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// protected
router.use(protect);
router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

// Restriced ONLY to ADMIN's
router.use(restrictTo('admin'));
router.route('/getAllUsers').get(getAllUsers);
router.route('/register').post(createUser);

export default router;
