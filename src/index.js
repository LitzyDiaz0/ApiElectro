require('dotenv').config();

require ('./server');
require ('./database');


const app = require('./server')



app.listen(app.get('port'), ()=>{
    console.log('Server is running on port: ', app.get('port'));
})