const routes = require('express').Router();

const { handleErrors, isLoggedIn } = require('../../util/api');
const {
  doesUserWithEmailExist,
  createUser,
  deleteUser,
} = require('../../actions/user');

routes.post('/', handleErrors(async (req, res) => {
  const { user: u } = req.body;
  if (typeof u !== 'object') {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }
  const userExists = await doesUserWithEmailExist(u.email);
  if (userExists) {
    res.status(409).json({ error: 'A user with that email already exists.' });
    return;
  }
  // TODO: make sure the user is NOT logged in
  const user = await createUser(u);
  res.status(201).json({ user });
}));

routes.delete('/:id', isLoggedIn, handleErrors(async (req, res) => {
  const { id } = req.params;
  // TODO: make sure the user is deleting their own account
  const user = await deleteUser(id);
  res.status(200).json({ user });
}));

module.exports = routes;
