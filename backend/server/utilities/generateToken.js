const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userId, email, username, isAdmin,imageUrl) => {
    return jwt.sign(
        { id: userId, email, username, isAdmin,imageUrl },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

module.exports.generateAccessToken = generateAccessToken;
