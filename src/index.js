require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

require ('./server');
require ('./database');


const app = require('./server')



app.listen(app.get('port'), ()=>{
    console.log('Server is running on port: ', app.get('port'));
})