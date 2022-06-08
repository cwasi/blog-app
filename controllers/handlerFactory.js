import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// deleteOne, updateOne, createOne, getOne, getAll

const getOne = (Modal, popOptions) =>
  catchAsync(async (req, res, next) => {
    const query = Modal.findById(req.params.id);
    if (popOptions) query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: doc },
    });
  });




  export {getOne}