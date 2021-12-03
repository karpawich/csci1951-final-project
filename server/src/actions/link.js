const Link = require('../models/link');

async function doesLinkExist(link) {
  const { anchor1, anchor2 } = link;
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
    authorId,
    eventId,
  } = options;
  const link = new Link({
    anchor1,
    anchor2,
    authorId,
    eventId,
  });
  await link.save();
  return link;
}

async function deleteLink(id) {
  const link = await Link.findByIdAndDelete(id);
  return link;
}

async function deleteLinksByAnchors(anchors) {
  const results = await Link.deleteMany(
    {
      $or: [
        { anchor1: { $in: anchors } },
        { anchor2: { $in: anchors } },
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
