const { Router } = require('express');
const router = Router();

const auth = require('../middlewares/auth');
// const {validateCreate} = require('../validators/users.validator')

const { renderSignUpGet,
  renderSignUpGetOne,
  renderUpdateUser,
  renderDeleteUser,
  signUp,
  renderSignUpGetMany,
  signIn,
  logOut } = require('../controllers/users.controller')

// Crear usuario
router.post('/users/signup', signUp);

//Trae los registros ya guardados
router.get('/users/signup', auth, renderSignUpGet);

//Trae los registros que coincidan con el nombre
router.get('/users/signupget/:name', renderSignUpGetMany);

//Trae un usuario ya registrado
router.get('/users/signup/:name', renderSignUpGetOne);

//Actualiza un usuario
router.put('/users/signup/:id', renderUpdateUser);

//eliminar un usuario
router.delete('/users/signup/:id', renderDeleteUser);

//iniciar sesion
router.post('/users/signin', signIn);

//cerrar sesion
router.get('/users/logout', logOut);

// Ejemplo de ruta protegida
router.get('/protected', auth, (req, res) => { 
  res.json({ message: 'Acceso autorizado a la ruta protegida' });
});

module.exports = router; 