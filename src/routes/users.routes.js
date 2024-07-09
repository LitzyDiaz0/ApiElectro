const { Router } = require('express');
const router = Router();

const auth = require('../middlewares/auth');
// const {validateCreate} = require('../validators/users.validator')

const { renderSignUpGet,
  renderSignUpGetOne,
  renderUpdateUser,
  renderDeleteUser,
  signUp,
  renderSignInForm,
  signIn,
  logOut } = require('../controllers/users.controller')

// Crear usuario
router.post('/users/signup', signUp);

//Trae los registros ya guardados
router.get('/users/signup', renderSignUpGet);

//Trae un usuario ya registrado
router.get('/users/signup/:id', renderSignUpGetOne);

//Actualiza un usuario
router.put('/users/signup/:id', renderUpdateUser);

//eliminar un usuario
router.delete('/users/signup/:id', renderDeleteUser);

router.get('/users/signin', renderSignInForm);

//iniciar sesion
router.post('/users/signin', signIn);

//cerrar sesion
router.get('/users/logout', logOut);

// Ejemplo de ruta protegida
router.get('/protected', auth, (req, res) => {
  res.send('Ruta protegida, funciona el tokeeeen :D');
});

module.exports = router; 