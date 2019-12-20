const getUserId = require("../../utils/getUserId");

module.exports = {
  async me(_, __, { photon, request }) {
    const userId = getUserId(request);

    const user = await photon.users.findOne({
      where: {
        id: userId
      }
    });

    if (!user) throw new Error("User doesn't exist");

    return user;
  }
};
