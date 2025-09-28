const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

function authJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(' ')[1];
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
