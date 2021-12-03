const Group = require('../models/group');

async function createGroup(options) {
  const {
    title,
    momentIds,
    eventId,
    authorId,
  } = options;
  const group = new Group({
    title, momentIds, eventId, authorId,
  });
  await group.save();
  return group;
}

async function deleteGroup(id) {
  const group = await Group.findByIdAndDelete(id);
  return group;
}

async function changeGroupTitle(id, title) {
  const group = await Group.findByIdAndUpdate(id, { title });
  return group;
}

async function addMomentIdToGroup(id, momentId) {
  const group = await Group.findByIdAndUpdate(id, { $addToSet: { momentIds: momentId } });
  return group;
}

async function removeMomentIdFromGroup(id, momentId) {
  const group = await Group.findByIdAndUpdate(id, { $pull: { momentIds: momentId } });
  return group;
}

module.exports = {
  createGroup,
  deleteGroup,
  changeGroupTitle,
  addMomentIdToGroup,
  removeMomentIdFromGroup,
};
