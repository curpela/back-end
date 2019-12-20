const Mutation = require("./mutations");
const Query = require("./queries");
const Types = require("./types");

module.exports = {
  Mutation,
  Query,
  ...Types
};
