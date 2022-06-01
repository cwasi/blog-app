import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    tirm: true,
  },
  email: {
    type: String,
    requried: [true, 'Email must not be empty'],
    tirm: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password should be more then 8 character'],
    select: false,
  },
  passwordconfirm: {
    type: String,
    requird: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same',
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User =mongoose.model('User',userSchema)

export default User
