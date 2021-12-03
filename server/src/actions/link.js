const Link = require('../models/link');

async function createLink(anchor1, anchor2) {
  const link = new Link({
    anchor1,
    anchor2,
  });

  await link.save();
  return link;
}

async function deleteLinks(ids) {
  const results = await Link.deleteMany({ _id: ids });
  return results;
}

module.exports = {
  createLink,
  deleteLinks,
};
