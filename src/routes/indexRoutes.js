const express = require ('express')
const router = express.Router();
const { renderIndex, renderHardware } = require('../controllers/indexControllers')

router.get('/', renderIndex)

// router.get('/hardware', renderHardware)


module.exports = router; 