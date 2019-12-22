const User = require("./User");
const UserPost = require("./UserPost");
const Follower = require("./Follower");

module.exports = {
  ...User,
  ...UserPost,
  ...Follower
};
