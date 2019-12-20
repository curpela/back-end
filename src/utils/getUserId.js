const jwt = require("jsonwebtoken");

module.exports = request => {
  // get token from auth header
  const token = request.req.headers.authorization;

  //   check if token exists
  if (!token) throw new Error("Authentication token required");

  // verify validity of jwt token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  return decodedToken.id;
};
