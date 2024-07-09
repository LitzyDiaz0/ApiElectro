const { verifyToken } = require('../helpers/generateToken');
const User = require('../models/user');

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const tokenData = await verifyToken(token);
        const user = await User.findById(tokenData.id);

        if (user && roles.includes(user.rol)) {
            next();
        } else {
            res.status(403).send('No tiene permisos para realizar esta acción. Solo administrador');
        }
    } catch (e) {
        console.log(e);
        res.status(409).send({ error: 'Error al verificar los permisos' });
    }
};

module.exports = checkRoleAuth;