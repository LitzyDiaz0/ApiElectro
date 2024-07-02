const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('name')
    .exist()
    .not()
    .isEmpty(),
    check('password')
    .exists()
    .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate}