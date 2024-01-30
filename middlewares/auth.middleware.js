const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();
module.exports.checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get Token from header
            token = authorization.split(' ')[1]
            // Verify Token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(userID);
            // Get User from Token
            req.user = await User.findById(userID).select('-password');
            next();

        } catch (err) {
            console.log(err);
            res.status(401).json({ "status": "failed", "message": "Unauthorized User" })

        }
    }
    if (!token) {
        res.status(401).json({ "status": "failed", "message": "Unauthorized User, No Token" })
    }

}