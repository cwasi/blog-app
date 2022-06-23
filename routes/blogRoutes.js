import express from 'express';
import {
  getAllBlogs,
  createBlog,
  uploadBlogImage,
  resizeBlogImage,
  UpdateBlog,
} from '../controllers/blogController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllBlogs)
  .post(protect, restrictTo('admin', 'user'), createBlog);

router.route('/:id').patch(uploadBlogImage, resizeBlogImage, UpdateBlog);

export default router;
