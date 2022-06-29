import Comment from '../models/commentModel.js';

import catchAsync from '../utils/catchAsync.js';
import {  deleteOne, updateOne, createOne, getOne, getAll} from './handlerFactory.js';

const setCommentAndUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.comment) req.body.comment = req.params.commentId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
});

const getAllComments = getAll(Comment)
const createComment = createOne(Comment)
const getComment = getOne(Comment)
const updateComment = updateOne(Comment)
const deleteComment = deleteOne(Comment)

export {
  setCommentAndUserIds,
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
};
