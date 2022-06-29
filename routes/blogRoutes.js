import express from 'express';
import {
  getAllBlogs,
  createBlog,
  uploadBlogImage,
  resizeBlogImage,
  UpdateBlog,
  getBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllBlogs)
  .post(protect, restrictTo('admin', 'user'), createBlog);

router
  .route('/:id')
  .get(getBlog)
  .patch(
    protect,
    restrictTo('admin', 'user'),
    uploadBlogImage,
    resizeBlogImage,
    UpdateBlog
  )
  .delete(protect, restrictTo('admin', 'user'),deleteBlog);

export default router;
