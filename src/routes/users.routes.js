const { Router } = require('express');
const router = Router();

const auth = require('../middlewares/auth');
const checkRoleAuth = require('../helpers/roleAuth')
// const {validateCreate} = require('../validators/users.validator')

const { renderSignUpGet,
  renderSignUpGetOne,
  renderUpdateUser,
  renderDeleteUser,
  signUp,
  renderSignUpGetMany,
  signIn,
  confirmarToken,
  denegarToken,
  logOut } = require('../controllers/users.controller')

// Crear usuario
router.post('/users/signup', signUp);

//Trae los registros ya guardados
router.get('/users/signup', auth, checkRoleAuth(['admin']), renderSignUpGet);

//Trae los registros que coincidan con el nombre
router.get('/users/signupget/:name', auth, checkRoleAuth(['admin']), renderSignUpGetMany);

//Trae un usuario ya registrado
router.get('/users/signup/:name', auth, checkRoleAuth(['admin']), renderSignUpGetOne);

//Actualiza un usuario
router.put('/users/signup/:id', auth, checkRoleAuth(['admin']), renderUpdateUser);

//eliminar un usuario
router.delete('/users/signup/:id', auth, checkRoleAuth(['admin']), renderDeleteUser); 

//iniciar sesion
router.post('/users/signin', signIn);

//cerrar sesion
router.get('/users/logout', logOut);

//Endpint de confirmacion
router.post('/users/confirm/:token', confirmarToken);

//Endpont de denegacion
router.delete('/users/denied/:token', auth, checkRoleAuth(['admin']), denegarToken);

// Ejemplo de ruta protegida
// router.get('/protected', auth, (req, res) => { 
//   res.json({ message: 'Acceso autorizado a la ruta protegida' });
// });

module.exports = router; 