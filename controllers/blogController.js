import multer from 'multer';
import sharp from 'sharp';
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

const UpdateBlog = catchAsync(async (req, res, next) => {
  const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!doc) {
    return next(new AppError('NO document found with that Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});

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
      data: doc,
    },
  });
});

export {
  uploadBlogImage,
  resizeBlogImage,
  getAllBlogs,
  createBlog,
  UpdateBlog,
};
