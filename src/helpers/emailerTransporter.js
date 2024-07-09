const nodemailer = require('nodemailer');

const emailerTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pizanadesantiagoricardo@gmail.com',
        pass: 'rvjs fbke wdhz gfke',
    },
});

module.exports = emailerTransport;