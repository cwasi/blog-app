import catchAsync from '../utils/catchAsync.js';
import Blog from '../models/blogModel.js';

const getAllBlogs = catchAsync(async (req, res, next) => {
  const doc = await Blog.find();

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

const createBlog = catchAsync(async (req, res, next) => {
  const doc = await Blog.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    },
  });
});

export { getAllBlogs, createBlog };
