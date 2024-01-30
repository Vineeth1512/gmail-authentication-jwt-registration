// auth.middleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();

module.exports.checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;

    if (authorization) {
        try {
            // Extract token without the "Bearer" prefix
            token = authorization.replace('Bearer ', '');
            console.log('Received Token:', token);
    
            // Verify Token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log('Decoded UserID:', userID);
    
            // Get User from Token
            req.user = await User.findById(userID).select('-password');
            next();
        } catch (err) {
            console.error('Token Verification Error:', err);
            res.status(401).json({ "status": "failed", "message": "Unauthorized User" });
        }
    } else {
        res.status(401).json({ "status": "failed", "message": "Unauthorized User, No Token" });
    }
};
