import express from 'express';
import { restrictTo, protect } from '../controllers/authController.js';
import {
  setCommentAndUserIds,
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllComments)
  .post(restrictTo('user'), setCommentAndUserIds, createComment);

router
  .route('/:id')
  .get(getComment)
  .patch(restrictTo('user','admin'), updateComment)
  .delete(restrictTo('user','admin'), deleteComment);

export default router;
