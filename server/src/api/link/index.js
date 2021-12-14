const routes = require('express').Router();
const { handleErrors } = require('../../util/api');
const {
  getLinksByAnchor,
  doesLinkExist,
  createLink,
  deleteLink,
} = require('../../actions/link');

routes.post('/anchor', handleErrors(async (req, res) => {
  const { anchor: a } = req.body;
  if (typeof a !== 'object') {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }
  const links = await getLinksByAnchor(a);
  // TODO: check if the user is either the link's scrapbook author
  // or in the link's scrapbook's event
  res.status(200).json({ links });
}));

routes.post('/', handleErrors(async (req, res) => {
  const { link: l } = req.body;
  if (typeof l !== 'object') {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }
  const linkExists = await doesLinkExist(l);
  if (linkExists) {
    res.status(409).json({ error: 'Link already exists' });
    return;
  }
  const link = await createLink(l);
  // TODO: check if the user is either the link's scrapbook author
  // or in the link's scrapbook's event
  res.status(201).json({ link });
}));

routes.delete('/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  // TODO: check if the user is either the link's scrapbook author
  // or in the link's scrapbook's event
  const link = await deleteLink(id);
  res.status(200).json({ link });
}));

module.exports = routes;
