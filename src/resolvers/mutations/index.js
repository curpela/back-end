const User = require("./User");
const Follower = require("./Follower");

module.exports = {
  ...User,
  ...Follower
};
