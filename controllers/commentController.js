import Comment from '../models/commentModel.js';
import catchAsync from '../utils/catchAsync.js';

const setCommentAndUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.comment) req.body.comment = req.params.commentId;
  if (!req.body.user) req.body.user = req.user.commentId;

  next();
});

const getAllCommnets = catchAsync(async (req, res, next) => {
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

export { setCommentAndUserIds,getAllCommnets };
