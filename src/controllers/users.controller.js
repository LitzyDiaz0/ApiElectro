const usersController = {};

usersController.renderSignUpForm = (req, res) =>{

} //obtiene el fomulario para registrar al usuario

usersController.signUp = (req, res) =>{
    res.sed('sign up ');
}//Regsitra al usuario

usersController.renderSignInForm = (req, res) =>{

} //carga los datos para iniciar sesion

usersController.signIn = (req, res) =>{

} //inicia sesion

module.exports = usersController;