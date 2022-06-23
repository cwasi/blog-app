import express from 'express';
import { getAllBlogs, createBlog } from '../controllers/blogController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllBlogs)
  .post(protect, restrictTo('admin','user'), createBlog);

export default router;
