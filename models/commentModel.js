import mongoose from 'mongoose';
import Blog from './blogModel.js';

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      require: [true, 'Comment cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    commentCreatedAt: {
      tyep: Date,
      default: Date.now,
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'Comment must belong to a blog'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
