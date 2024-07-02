const express = require('express');
const path = require('path');

// Inicializadores

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname, 'views')) //ubica la carpeta views de manera global

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Variables globales
 
// Rutas
app.use(require('./routes/indexRoutes'));
app.use(require('./routes/hardware.routes'));
app.use(require('./routes/users.routes'));

// Archivos staticos
app.use(express.static(path.join(__dirname, 'public'))); //Hace que cualquiera que acceda a la carpeta de manera facil


module.exports = app