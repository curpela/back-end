const jwt = require("jsonwebtoken");

/*
 * Generates JWT Token
 */

module.exports = id => {
  if (!id) {
    throw new Error("Please provide an id to generate JWT Token");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7 days" });
};
