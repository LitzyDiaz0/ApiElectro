const usersController = {};
const User = require('../models/user');
const UserSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailerTransport= require('../helpers/emailerTransporter');


usersController.signUp = async (req, res) => {
    const { name, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({
        name,
        password: hashedPassword,
        email
    });
  
    newUser.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));


    // Generar token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

    const mailOptions = {
        from: 'pizanadesantiagoricardo@gmail.com',
        to: "2137000866@utna.edu.mx",
        subject: 'Solicitud de nuevo usuario',
        html: `
        <p>Hay una solicitud de registro de un nuevo usuario</p>
        <p>Username: ${name}</p>
        <p>Correo: ${email}</p>
        <p>Token: ${token}</p>
        `
    }

    emailerTransport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.err('Se erro al mandar correo de confirmación')
            return res.status(500).send('Error al mandar correo de confirmacion. ');
        }else{
            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Registro exitoso, esperando la confirmacion de un administrador')
        }
      })
  };//Regsitra al usuario y manda token al admin

  


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
}//Obtiene los usuarios coincidientes

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

usersController.renderDeleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const admin = await User.findById(id)
        if(admin.rol === "admin"){
            return res.status(403).send('No se puede eliminar el perfil del administrador')
        }
        const usuario = await User.findByIdAndDelete(req.params.id);
        if(!usuario){
            return res.status(404).send();
        }
        res.send(usuario);
        // UserSchema
        //     .deleteOne({ _id: id })
        //     .then((data) => res.json(data))
        //     .catch((error) => res.json({ message: error }));
    }catch(err){
        res.status(500).send(err);
    }
    
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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

        // Configurar la cookie con el token JWT
        res.cookie('token', token, {
            httpOnly: true, // Evita que el token sea accesible desde JavaScript en el navegador
            maxAge: 1000 * 60 * 60 * 10, // Tiempo de vida del token en milisegundos (40 minutos en este ejemplo)
        });

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


usersController.confirmarToken = async (req, res) =>{
    const {token} = req.params;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await User.findByIdAndUpdate(decoded.id, {status: 'confirmado'});
        res.send('Usuario confirmado');
    }
    catch(err){
        console.log('error: ', err)
        res.status(400).send('Token invalido');
    }
}



usersController.denegarToken = async (req, res) =>{
    const {token} = req.params;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await User.findByIdAndDelete(decoded.id);
        res.send('Usuario rechazado');
    }
    catch(err){
        console.log('error: ', err)
        res.status(400).send('Token invalido');
    }
}

module.exports = usersController; 