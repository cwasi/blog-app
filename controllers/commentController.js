import Comment from '../models/commentModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const setCommentAndUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.comment) req.body.comment = req.params.commentId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
});

const getAllComments = catchAsync(async (req, res, next) => {
  const doc = await Comment.find();

  res.status(200).json({
    status: 'success',
    requestedAt: new Date().toISOString(),
    result: doc.length,
    data: {
      data: doc,
    },
  });
});

const createComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.create(req.body);

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});

const getComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});

const updateComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

const deleteComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export {
  setCommentAndUserIds,
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
};
