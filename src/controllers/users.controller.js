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
};//Regsitra al usuario *actualizado 

usersController.renderSignUpGet = (req, res) =>{
    UserSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}));
} //obtiene todos los datos de los usuarios ya registrados

usersController.renderSignUpGetOne = (req, res) =>{
    const { id } = req.params;
    UserSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}));
} //obtiene datos de un usuario especifico

usersController.renderUpdateUser = (req, res) =>{
    const { id } = req.params;
    const { name, password } = req.body;
    UserSchema
    .updateOne({_id: id}, { $set: {name, password}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}));
} //actualiza un usuario especifica

usersController.renderDeleteUser = (req, res) =>{
    const { id } = req.params;
    UserSchema
    .deleteOne({_id: id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}));
} //elimina un usuario especifico

usersController.renderSignInForm = (req, res) =>{

} //carga los datos para iniciar sesion

usersController.signIn = async (req, res) => {
  const { name, password } = req.body;
  try {
      const user = await User.findOne({ name });
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '20m' });
      res.json({ token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
}; //inicia sesion *actualizado

usersController.logOut = (req,res) =>{
    res.send('log out')
} //Cierra sesion

module.exports = usersController; 