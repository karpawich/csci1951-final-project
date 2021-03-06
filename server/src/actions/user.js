const User = require('../models/user');

async function doesUserWithEmailExist(email) {
  const u = await User.findOne({ email });
  return u !== null;
}

async function createUser(options) {
  const { email, firstName, lastName } = options;
  // check if user already exists
  const u = await User.findOne({ email });
  if (u) {
    throw new Error('User already exists');
  }
  const user = new User({
    email,
    firstName,
    lastName,
  });
  await user.save();
  return user;
}

async function deleteUser(email) {
  const user = await User.findOneAndDelete({ email });
  return user;
}

module.exports = {
  doesUserWithEmailExist,
  createUser,
  deleteUser,
};
