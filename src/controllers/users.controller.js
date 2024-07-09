const usersController = {};
const User = require('../models/user');
const UserSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

usersController.signUp = async (req, res) => {
    const { name, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({
        name,
        password: hashedPassword
    });
  
    newUser.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
  };//Regsitra al usuario *actualizado


usersController.renderSignUpGet = (req, res) => {
    UserSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
} //obtiene todos los datos de los usuarios ya registrados

usersController.renderSignUpGetMany = async (req, res) =>{
    const { name } = req.params;

    try {
        const users = await User.find({ name });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios con ese nombre' });
        }

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
    }
}//Obtinee los usuarios coincidientes

usersController.renderSignUpGetOne = async (req, res) => {
    const { name } = req.params;
    try {
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
    }
} //obtiene datos de un usuario especifico

usersController.renderUpdateUser = (req, res) => {
    const { id } = req.params;
    const { name, password } = req.body;
    UserSchema
        .updateOne({ _id: id }, { $set: { name, password } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
} //actualiza un usuario especifica

usersController.renderDeleteUser = (req, res) => {
    const { id } = req.params;
    UserSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
} //elimina un usuario especifico

usersController.renderSignInForm = (req, res) => {

} //carga los datos para iniciar sesion

usersController.signIn = async (req, res) => {
    const { name, password } = req.body;
    try {
        // Verificar credenciales y obtener el usuario
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '40m' });

        // Configurar la cookie con el token JWT
        res.cookie('token', token, { httpOnly: true });

        // Enviar respuesta al cliente
        res.json({ message: 'Ingreso exitoso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
    }
  };
  
  usersController.logOut = (req, res) => {
    // Limpiar la cookie 'token'
    res.clearCookie('token'); // Esto elimina la cookie llamada 'token'

    res.send('Usuario deslogueado exitosamente');
};
//cierra sesion


module.exports = usersController; 