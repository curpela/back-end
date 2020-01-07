const getUserId = require("../../utils/getUserId");

module.exports = {
  /*
   * Fetches current users profile
   */
  async me(_, __, { photon, request }) {
    const userId = getUserId(request);

    const user = await photon.users.findOne({
      where: {
        id: userId
      }
    });

    if (!user) throw new Error("User doesn't exist");

    return user;
  },
  /*
   * Fetches 25 chronologically ordered posts by users that the current user is following
   */
  async feed(_, args, { photon, request }) {
    const userId = getUserId(request);

    return await photon.posts.findMany({
      where: {
        author: {
          followers: {
            some: {
              follower: {
                id: userId
              }
            }
          }
        }
      },
      skip: args.skip || null,
      after: args.after || null,
      before: args.before || null,
      first: args.first || null,
      last: args.last || 25
    });
  }
};
