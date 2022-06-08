import multer from 'multer';
import sharp from 'sharp';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import { getOne, deleteOne, updateOne } from './handlerFactory.js';
import AppError from '../utils/appError.js';

const muslterStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please uplad only images', 400), false);
  }
};

const upload = multer({ storage: muslterStorage, fileFilter: multerFilter });

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user try to modify password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('NOT AllOED '), 400);
  }

  // 2) Filtered our unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  if (req.file) filteredBody.photo = req.file.filename;
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
    userFinAndModify: false,
  });

  // 3) update user document
  res.status(200).json({
    status: 'success',
    data: { user: updateUser },
  });
});

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const getUser = getOne(User);
const getAllUser = () => {};
// Do NOT update password with this
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);

export {
  createUser,
  getMe,
  deleteMe,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
};
