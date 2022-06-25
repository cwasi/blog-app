import express from 'express';
import { restrictTo, protect } from '../controllers/authController.js';
import {
  setCommentAndUserIds,
  createComment,
  getAllComments,
} from '../controllers/commentController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllComments)
  .post(restrictTo('user'), setCommentAndUserIds, createComment);

export default router;
