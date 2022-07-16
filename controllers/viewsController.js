import catchAsync from '../utils/catchAsync.js';

const getBlogs = catchAsync(async (req, res, next) => {
  res.status(200).render('blog', { title: 'Blog' });
});

const getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', { title: 'Login' });
});

export { getLoginForm, getBlogs };
