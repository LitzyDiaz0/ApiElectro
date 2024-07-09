const mongoose = require('mongoose');

const {NOTES_APP_MONGODB_HOST} = process.env;
const mongodb_url = `mongodb://${NOTES_APP_MONGODB_HOST}`;

mongoose.connect(mongodb_url, {
})

    .then(db => console.log('Base de detos conectada'))
    .catch(err => console.log(err))