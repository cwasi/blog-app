import multer from 'multer';
import sharp from 'sharp';
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from './handlerFactory.js';
import catchAsync from '../utils/catchAsync.js';
import Blog from '../models/blogModel.js';
import AppError from '../utils/appError.js';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('imaga')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload only image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadBlogImage = upload.single('photo');

const resizeBlogImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `Blog-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/blogImages/${req.file.filename}`);

  next();
});

const createBlog = createOne(Blog);
const getAllBlogs = getAll(Blog);
const UpdateBlog = updateOne(Blog);
const deleteBlog = deleteOne(Blog);
const getBlog = getOne(Blog);

export {
  uploadBlogImage,
  resizeBlogImage,
  getAllBlogs,
  createBlog,
  UpdateBlog,
  getBlog,
  deleteBlog,
};
