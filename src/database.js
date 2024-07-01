const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DB } = process.env;
const mongodb_url = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DB}`;

// const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;
// const NOTES_APP_MONGODB_DB = process.env.NOTES_APP_MONGODB_DB;

mongoose.connect(mongodb_url, {
})

    .then(db => console.log('Base de detos conectada'))
    .catch(err => console.log(err))