const mongoose = require('mongoose');
const validator = require('validator');

/**
 * The Mongoose Schema for a user.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    // Only Brown University email addresses are
    // accepted for the purposes of this prototype.
    validate: (str) => {
      if (typeof str !== 'string') return false;
      return (
        validator.default.isEmail(str)
        && str.endsWith('brown.edu')
      );
    },
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
