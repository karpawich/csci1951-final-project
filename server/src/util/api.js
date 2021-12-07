const { Error: { ValidationError } } = require('mongoose');
const User = require('../models/user');

/**
 * A helpful utility function that handles the errors
 * for a given HTTP endpoint function.
 *
 * @param fn The endpoint function to be executed.
 */
function handleErrors(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
}

/**
 * Generates a middleware function that returns
 * 401 Unauthorized if a user is not logged in.
 */
async function isLoggedIn(req, res, next) {
  function respondUnauthorized() {
    if (req.path.startsWith('/api')) {
      res.status(401).send();
    } else {
      res.redirect('/login');
    }
  }

  const { email } = req.session;
  if (!email) {
    respondUnauthorized();
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    respondUnauthorized();
    return;
  }
  next();
}

module.exports = {
  handleErrors,
  isLoggedIn,
};
