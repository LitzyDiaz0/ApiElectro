const { validateResult } = require('express-validator');

const validateResult = (req, res, next) =>{
    try{
        validateResult(req).throw()
        return next()
    }catch{
        res.status(403)
        res.send({errors: errors.array() })
    }
}

module.exports = {validateResult}