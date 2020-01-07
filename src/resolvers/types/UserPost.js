module.exports = {
  media(parent, _, { photon }) {
    return photon.media.findMany({
      where: {
        post: {
          id: parent.id
        }
      }
    });
  },
  likes(parent, _, { photon }) {
    return photon.postLikes.findMany({
      where: {
        post: {
          id: parent.id
        }
      },
      last: 5
    });
  },
  comments(parent, _, { photon }) {
    return photon.postComments.findMany({
      where: {
        post: {
          id: parent.id
        }
      },
      last: 5
    });
  }
};
