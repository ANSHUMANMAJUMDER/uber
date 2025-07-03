const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [3, 'Firstname must be at least 3 characters long'],
  },
  lastname: {
    type: String,
    required: true,
    minlength: [3, 'Lastname must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
  },
  password: {
    type: String,
    required: true,
    select: false, // Excluded by default in queries
  },
  socketId: {
    type: String,
  },
});

// Generate auth token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
  return token;
};

// Compare password
UserSchema.methods.comparePassword = async function (password) {
  if (!this.password) {
    throw new Error('Password field is not loaded in the user object.');
  }
  return await bcrypt.compare(password, this.password);
};

// Hash password
UserSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;
