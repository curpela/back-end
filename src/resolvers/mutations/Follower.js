const getUserId = require("../../utils/getUserId");

module.exports = {
  async followUser(_, args, { photon, request }, info) {
    const userId = getUserId(request);

    // query requested user to follow
    const isUser = await photon.users.findOne({
      where: {
        id: args.id
      }
    });

    // check to see if the requested user to follow exists
    if (!isUser)
      throw new Error(
        "Sorry, but the user you're trying to follow doesn't exist "
      );

	  return photon.followers.create(
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
  },
  async unfollowUser(_, args, { photon, request }) {
    const userId = getUserId(request);

    const isFollowing = await photon.followers.findMany({
      where: {
        follower: {
          id: userId
        },
        following: {
          id: args.id
        }
      }
    });

    if (!isFollowing.length > 0)
      throw new Error("You're not following that user");

    await photon.followers.delete({
      where: {
        id: isFollowing[0].id
      }
    });

    return args.id;
  }
};
