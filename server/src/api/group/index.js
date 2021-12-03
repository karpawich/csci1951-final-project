const routes = require('express').Router();
const { handleErrors } = require('../../util/api');
const {
  createGroup,
  deleteGroup,
  changeGroupTitle,
  addMomentIdToGroup,
  removeMomentIdFromGroup,
} = require('../../actions/group');
const {
  deleteLinksByAnchors,
} = require('../../actions/link');

routes.post('/', handleErrors(async (req, res) => {
  const { group: g } = req.body;
  // TODO: check if the user is either the group author or in the groups' event
  const group = await createGroup(g);
  res.status(201).json({ group });
}));

routes.patch('/title/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  // TODO: check if the user is either the group author or in the groups' event
  const group = await changeGroupTitle(id, title);
  res.status(200).json({ group });
}));

routes.post('/moment/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { momentId } = req.body;
  // TODO: check if the user is either the group author or in the groups' event
  const group = await addMomentIdToGroup(id, momentId);
  res.status(200).json({ group });
}));

routes.delete('/moment/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const { momentId } = req.body;
  // TODO: check if the user is either the group author or in the groups' event
  const group = await removeMomentIdFromGroup(id, momentId);
  res.status(200).json({ group });
}));

routes.delete('/:id', handleErrors(async (req, res) => {
  const { id } = req.params;
  const group = await deleteGroup(id);
  // TODO: check if the user is either the group author or in the groups' event
  await deleteLinksByAnchors([{
    anchorType: 'group',
    anchorId: id,
  }]);
  res.status(200).json({ group });
}));

module.exports = routes;
