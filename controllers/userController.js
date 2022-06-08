import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import { getOne } from './handlerFactory.js';

const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).jsob({
    status: 'success',
    data: null,
  });
});

const getUser = getOne(User);
const getAllUser = () => {};
const updateUser = () => {};
const deleteUser = () => {};

export {
  createUser,
  getMe,
  deleteMe,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
};
