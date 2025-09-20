const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

function authJWT(req, res, next) {
  // Try cookie first, then Authorization header
  const token = req.cookies.authToken || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  jwt.verify(token, jwtsecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Bad Auth" });
    }

    req.user = decoded; // { userId: ... }
    next();
  });
}

module.exports = authJWT;
