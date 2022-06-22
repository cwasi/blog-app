import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  author: {
    type: String,
    tirm: true,
    lowercase: true,
    maxlength: [30, 'author should be less than 30 characters'],
  },
  title: {
    type: String,
    lowercase: true,
    maxlength: [70, 'title should be less than 70 characters'],
  },
  description: { type: String },
  image: { type: String, default: 'image' },
  category: { type: [String] },
});

const Blog = mongoose.model('blog', blogSchema);

export default Blog;
