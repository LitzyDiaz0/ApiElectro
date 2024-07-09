const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Verificar si hay un token en las cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token exist, authorization denied' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
