module.exports = {
  following(parent, _, { photon }) {
    return photon.followers
      .findOne({
        where: {
          id: parent.id
        }
      })
      .following();
  },
  follower(parent, _, { photon }) {
    return photon.followers
      .findOne({
        where: {
          id: parent.id
        }
      })
      .follower();
  }
};
