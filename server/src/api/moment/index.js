const routes = require('express').Router();
const { handleErrors } = require('../../util/api');
const {
  createMoment,
  deleteMoments,
  addEmailToMomentsByEventId,
  removeEmailFromMomentsByEventId,
  getMoment,
  searchMoments,
} = require('../../actions/moment');
const {
  deleteLinksByAnchors,
} = require('../../actions/link');

routes.post('/', handleErrors(async (req, res) => {
  const { moment: m } = req.body;
  // TODO: check if the user's email is in the moment's event's emails
  const moment = await createMoment(m);
  res.status(201).json({ moment });
}));

routes.post('/email/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  // TODO: check if the user's email is in the moment's event's emails
  const results = await addEmailToMomentsByEventId(id, email);
  res.status(200).json({ results });
}));

routes.delete('/email/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  // TODO: check if the user's email is in the moment's event's emails
  const results = await removeEmailFromMomentsByEventId(id, email);
  res.status(200).json({ results });
}));

routes.delete('/:id', handleErrors(async (req, res) => {
  const { ids } = req.params;
  // TODO: check if the user's email is in the moment's event's emails
  const results = await deleteMoments(ids);
  await deleteLinksByAnchors(ids.map((id) => ({
    anchorType: 'moment',
    anchorId: id,
  })));
  res.status(200).json({ results });
}));

routes.get('/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  // TODO: check if the user's email is in the moment's event's emails
  const moment = await getMoment(id);
  res.status(200).json({ moment });
}));

routes.post('/search', handleErrors(async (req, res) => {
  const { query } = req.body;
  // TODO: check if the user's email is in the moment's event's emails
  const moments = await searchMoments(query);
  res.status(200).json({ moments });
}));

module.exports = routes;
