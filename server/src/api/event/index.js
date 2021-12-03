const routes = require('express').Router();
const { handleErrors } = require('../../util/api');
const {
  createEvent,
  deleteEvent,
  stopEvent,
  changeEventName,
  addEmailToEvent,
  removeEmailFromEvent,
  getEventsByEmail,
} = require('../../actions/event');
const {
  addEmailToMomentsByEventId,
  removeEmailFromMomentsByEventId,
} = require('../../actions/moment');

routes.post('/', handleErrors(async (req, res) => {
  const { event: e } = req.body;
  // TODO: make sure that the user's email is in the event
  const event = await createEvent(e);
  res.status(201).json({ event });
}));

routes.patch('/stop/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  // TODO: make sure that the user's email is in the event
  const event = await stopEvent(id);
  res.status(200).json({ event });
}));

routes.patch('/name/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  // TODO: make sure that the user's email is in the event
  const event = await changeEventName(id, name);
  res.status(200).json({ event });
}));

routes.post('/email/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  // TODO: make sure that the user's email is in the event
  const event = await addEmailToEvent(id, email);
  await addEmailToMomentsByEventId(id, email);
  res.status(200).json({ event });
}));

routes.delete('/email/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  // TODO: make sure that the user's email is in the event
  const event = await removeEmailFromEvent(id, email);
  await removeEmailFromMomentsByEventId(id, email);
  res.status(200).json({ event });
}));

routes.delete('/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  // TODO: make sure that the user's email is in the event
  const event = await deleteEvent(id);
  res.status(200).json({ event });
}));

routes.post('/email', handleErrors(async (req, res) => {
  const { email } = req.body;
  // TODO: make sure that the user's email is this email
  const events = await getEventsByEmail(email);
  res.status(200).json({ events });
}));

module.exports = routes;
