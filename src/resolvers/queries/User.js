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
   * Fetches user profile by username
   */
  async profile(_, args, { photon }) {
    return photon.users.findOne({
      where: {
        username: args.username
      }
    });
  }
};
