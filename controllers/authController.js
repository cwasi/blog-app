import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  console.log(req.body);

  console.log(`${req.protocol}://${req.get('host')}/me`);

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

export { signup };
