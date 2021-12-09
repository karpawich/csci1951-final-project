const routes = require('express').Router();
const User = require('../../models/user');
const { handleErrors } = require('../../util/api');

/**
 * A login endpoint that issues a new cookie
 * when supplied with a valid email.
 */
routes.post('/login', handleErrors(async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  const { email } = req.body;

  // validate email
  const user = await User.findOne({ email });
  if (!user) {
    res.redirect('/login');
    return;
  }

  // log the user in
  req.session.email = email;

  // pass their email as a cookie
  res.cookie('username', email);

  res.redirect('/');
}));

/**
 * Logs a user out from their organization.
 */
routes.post('/logout', handleErrors(async (req, res) => {
  req.session.email = undefined;
  res.redirect('/');
}));

/**
 * Checks whether the user is logged in.
 */
routes.get('/check', handleErrors(async (req, res) => {
  const { email } = req.session;
  if (!email) {
    res.status(401).send();
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).send();
    return;
  }
  res.status(200).send();
}));

module.exports = routes;
