const { Types: { ObjectId } } = require('mongoose');
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

async function getGroup(id) {
  // TODO momentIds should be renamed to moments
  // when the array gets populated
  const group = await Group.findById(id).populate('momentIds');
  return group;
}
async function getGroupsByIds(ids) {
  const groupIds = ids.map((id) => ObjectId(id));
  const groups = await Group.find({ _id: { $in: groupIds } });
  return groups;
}

async function deleteGroup(id) {
  const group = await Group.findByIdAndDelete(id);
  return group;
}

async function changeGroupTitle(id, title) {
  const group = await Group.findByIdAndUpdate(id, { title }, { returnDocument: 'after' });
  return group;
}

async function addMomentIdToGroup(id, momentId) {
  const group = await Group.findByIdAndUpdate(id, { $addToSet: { momentIds: momentId } }, { returnDocument: 'after' });
  return group;
}

async function removeMomentIdFromGroup(id, momentId) {
  const group = await Group.findByIdAndUpdate(id, { $pull: { momentIds: momentId } }, { returnDocument: 'after' });
  return group;
}

module.exports = {
  getGroup,
  getGroupsByIds,
  createGroup,
  deleteGroup,
  changeGroupTitle,
  addMomentIdToGroup,
  removeMomentIdFromGroup,
};
