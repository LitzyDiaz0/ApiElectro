const express = require ('express')
const router = express.Router();
const { renderIndex } = require('../controllers/indexControllers')

router.get('/', renderIndex)

router.get('/hardware', (req, res) =>{
    res.render('hardware')
})


module.exports = router; 