const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userId, email, username, isAdmin) => {
    return jwt.sign(
        { id: userId, email, username, isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

module.exports.generateAccessToken = generateAccessToken;
