const jwt = require("jsonwebtoken");

/*
 * Parses current user id from jwt token passed in auth headers
 */

export default request => {
  // get token from auth header
  const token = request.req.headers.authorization;

  // check if token exists
  if (!token) throw new Error("Authentication token required");

  // verify validity of jwt token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  return decodedToken.id;
};
