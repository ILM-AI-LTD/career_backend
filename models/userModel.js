const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  institution: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

// Instance method to generate JWT token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  try {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (error) {
    console.error('Error generating auth token:', error);
    throw new Error('Failed to generate authentication token');
  }
};

// Instance method to match passwords
userSchema.methods.matchPasswords = async function (password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error matching passwords:', error);
    throw new Error('Failed to match passwords');
  }
};

// Static method for login
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('The email address is not registered');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Incorrect password');

    return user;
  } catch (error) {
    console.error('Error in findByCredentials:', error);
    throw error;
  }
};

// Static method to find by token
userSchema.statics.findByToken = async (id, token) => {
  try {
    return await User.findOne({ _id: id, 'tokens.token': token });
  } catch (error) {
    console.error('Error in findByToken:', error);
    throw error;
  }
};

// Middleware: hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      user.password = await bcrypt.hash(user.password, 8);
      next();
    } catch (error) {
      console.error('Error hashing password:', error);
      next(error);
    }
  } else {
    next();
  }
});

// Handle duplicate email error
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already registered'));
  } else {
    next(error);
  }
});

// Override toJSON to hide password & tokens
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
