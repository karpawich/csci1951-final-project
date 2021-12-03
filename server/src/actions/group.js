const Group = require('../models/group');

async function createGroup(title, moments) {
  const group = new Group({ title, moments });
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

async function addMomentToGroup(id, moment) {
  const group = await Group.findByIdAndUpdate(id, { $addToSet: { moments: moment } });
  return group;
}

async function removeMomentFromGroup(id, moment) {
  const group = await Group.findByIdAndUpdate(id, { $pull: { moments: moment } });
  return group;
}

module.exports = {
  createGroup,
  deleteGroup,
  changeGroupTitle,
  addMomentToGroup,
  removeMomentFromGroup,
};
