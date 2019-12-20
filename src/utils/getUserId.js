const jwt = require("jsonwebtoken");

module.exports = request => {
  const token = request.req.headers.authorization;

  if (!token) throw new Error("Authentication token required");

  // verify validity of jwt token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  return decodedToken.id;
};
