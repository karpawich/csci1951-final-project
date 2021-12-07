const { Types: { ObjectId } } = require('mongoose');
const Link = require('../models/link');

async function doesLinkExist(link) {
  const { anchor1, anchor2 } = link;
  anchor1.anchorId = ObjectId(anchor1.anchorId);
  anchor2.anchorId = ObjectId(anchor2.anchorId);

  const l = await Link.findOne({
    $or: [
      {
        anchor1,
        anchor2,
      },
      {
        anchor1: anchor2,
        anchor2: anchor1,
      },
    ],
  });
  return l !== null;
}

async function createLink(options) {
  const {
    anchor1,
    anchor2,
    scrapbookId,
  } = options;
  const link = new Link({
    anchor1,
    anchor2,
    scrapbookId,
  });
  await link.save();
  return link;
}

async function deleteLink(id) {
  const link = await Link.findByIdAndDelete(id);
  return link;
}

async function deleteLinksByAnchors(anchors) {
  const anchorsCopy = [...anchors.map((a) => ({
    anchorType: a.anchorType,
    anchorId: ObjectId(a.anchorId),
  }))];
  const results = await Link.deleteMany(
    {
      $or: [
        { anchor1: { $in: anchorsCopy } },
        { anchor2: { $in: anchorsCopy } },
      ],
    },
  );
  return results;
}

async function deleteLinksByScrapbookId(scrapbookId) {
  const results = await Link.deleteMany(
    {
      scrapbookId,
    },
  );
  return results;
}

module.exports = {
  doesLinkExist,
  createLink,
  deleteLink,
  deleteLinksByAnchors,
  deleteLinksByScrapbookId,
};
