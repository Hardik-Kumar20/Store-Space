const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

function authJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message : "Token not provided."});
  }

  const token = authHeader.split(' ')[1];
  try {
    const decode = jwt.verify(token , jwtsecret);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authJWT;
