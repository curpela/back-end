const getUserId = require("../../utils/getUserId");

module.exports = {
  async followUser(_, args, { photon, request }, info) {
    const userId = getUserId(request);

    const follower = photon.followers.create(
      {
        data: {
          follower: {
            connect: {
              id: userId
            }
          },
          following: {
            connect: {
              id: args.id
            }
          }
        }
      },
      info
    );

    return follower;
  },
  async unfollowUser(_, args, { photon, request }, info) {
    const userId = getUserId(request);

    await photon.followers.delete({
      where: {
        id: args.id
      }
    });

    return args.id;
  }
};
