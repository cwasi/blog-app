import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import { getOne,deleteOne } from './handlerFactory.js';

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

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const getUser = getOne(User);
const getAllUser = () => {};
// Do NOT update password with this
const deleteUser = deleteOne(User)

export {
  createUser,
  getMe,
  deleteMe,
  getUser,
  getAllUser,
  deleteUser,
};
