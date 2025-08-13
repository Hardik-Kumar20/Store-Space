const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

function authJWT(req , res , next) {
    const authToken = req.headers.authorization;
    if(!authToken) return res.status(400).json({message : "No token"})
    
    const token = authToken.split('')[1];

    // verifying
    jwt.verify(token , jwtsecret , (err , user)=>{
        if(err) return res.status(401).json({message : "Bad Auth"});

        req.user = user;
        next();
    })
}
module.exports = authJWT;