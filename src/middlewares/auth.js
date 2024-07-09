const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // Verificar si hay un token en las cookies
    const token = req.cookies.token;
    console.log("token: ", token);

    if (!token) {
        return res.status(400).send('No tienes acceso, inicia sesión');
    }

    
    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Token invalido' });
    }
   
};

module.exports = auth;
