const usersController = {};
const User = require('../models/user');
const UserSchema = require('../models/user');

usersController.signUp = (req, res) => {
    const user = UserSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}//Regsitra al usuario

usersController.renderSignUpGet = (req, res) => {
    UserSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
} //obtiene todos los datos de los usuarios ya registrados

usersController.renderSignUpGetOne = (req, res) => {
    const { id } = req.params;
    UserSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
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

usersController.signIn = (req, res) => {

} //inicia sesion

usersController.logOut = (req, res) => {
    res.send('log out')
} //Cierra sesion

module.exports = usersController; 