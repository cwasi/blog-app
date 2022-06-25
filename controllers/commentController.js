import Comment from '../models/commentModel.js';
import catchAsync from '../utils/catchAsync.js';

const setCommentAndUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.comment) req.body.comment = req.params.commentId;
  if (!req.body.user) req.body.user = req.id;

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

export { setCommentAndUserIds, createComment, getAllComments };
