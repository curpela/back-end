module.exports = {
  password() {
    return null;
  },
  followers(parent, _, { photon }) {
    return photon.followers.findMany({
      where: {
        following: {
          id: parent.id
        }
      }
    });
  },
  following(parent, _, { photon }) {
    return photon.followers.findMany({
      where: {
        follower: {
          id: parent.id
        }
      }
    });
  },
  async followerCount(parent, _, { photon }) {
    // TODO: REPLACE WITH ACTUAL AGGREGATION
    const followers = await photon.followers.findMany({
      where: {
        following: {
          id: parent.id
        }
      }
    });

    return followers.length;
  },
  async followingCount(parent, _, { photon }) {
    // TODO: REPLACE WITH ACTUAL AGGREGATION
    const following = await photon.followers.findMany({
      where: {
        follower: {
          id: parent.id
        }
      }
    });

    return following.length;
  }
};
