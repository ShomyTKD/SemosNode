const JWTData = require('../config/JWT_SECRET');
const jwt = require('jsonwebtoken');

const authentificate = (req, res, next) => {
    const authData = req.header('Authorization');
    if (!authData) {
        return res.status(401).send('Token is not present');
    }
    const token = authData.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWTData.JWT_SECRET);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

module.exports = { authentificate };