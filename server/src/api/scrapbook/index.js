const routes = require('express').Router();
const { handleErrors } = require('../../util/api');
const {
  createScrapbook,
  deleteScrapbook,
  changeScrapbookName,
  changeScrapbookStart,
  getScrapbook,
  getScrapbooksByAuthor,
  getScrapbooksByEventId,
} = require('../../actions/scrapbook');
const {
  deleteLinksByScrapbookId,
} = require('../../actions/link');

routes.post('/', handleErrors(async (req, res) => {
  const { scrapbook: s } = req.body;
  if (typeof s !== 'object') {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }
  // TODO: check if the user is either the scrapbook author or in the scrapbook's event
  const scrapbook = await createScrapbook(s);
  res.status(201).json({ scrapbook });
}));

routes.patch('/name/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  // TODO: check if the user is either the scrapbook author or in the scrapbook's event
  const scrapbook = await changeScrapbookName(id, name);
  res.status(200).json({ scrapbook });
}));

routes.patch('/start/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { start } = req.body;
  // TODO: check if the user is either the scrapbook author or in the scrapbook's event
  const scrapbook = await changeScrapbookStart(id, start);
  res.status(200).json({ scrapbook });
}));

routes.post('/author', handleErrors(async (req, res) => {
  const { author } = req.body;
  // TODO: check if the user is either the scrapbook author or in the scrapbook's event
  const scrapbooks = await getScrapbooksByAuthor(author);
  res.status(200).json({ scrapbooks });
}));

routes.get('/event/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  // TODO: check if the user is either the scrapbook author or in the scrapbook's event
  const scrapbooks = await getScrapbooksByEventId(id);
  res.status(200).json({ scrapbooks });
}));

routes.get('/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  // TODO: check if the user is either the scrapbook author or in the scrapbook's event
  const scrapbook = await getScrapbook(id);
  res.status(200).json({ scrapbook });
}));

routes.delete('/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const scrapbook = await deleteScrapbook(id);
  // TODO: check if the user is either the scrapbook author or in the scrapbook's event
  await deleteLinksByScrapbookId(id);
  res.status(200).json({ scrapbook });
}));

module.exports = routes;
