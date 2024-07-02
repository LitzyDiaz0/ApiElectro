const { Router } = require('express');
const router =  Router();

const { renderSignUpGet, renderSignUpGetOne, renderUpdateUser, renderDeleteUser, signUp, renderSignInForm, signIn, logOut } = require ('../controllers/users.controller')

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

router.post('/users/signin', signIn);

router.get('/users/logout', logOut);

module.exports = router; 