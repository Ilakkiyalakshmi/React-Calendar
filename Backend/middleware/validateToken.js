const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "User is not Authorized or token is missing"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: "User is not Authorized"
            });
        }
        req.user = decoded.user;
        next();
    });
});

module.exports = validateToken;
