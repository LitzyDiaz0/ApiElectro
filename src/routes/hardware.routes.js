const { Router } = require('express');
const router = Router();
const auth = require('../middlewares/auth');
const checkRoleAuth = require('../helpers/roleAuth')
const {
    renderHardwareForm,
    createNewHardware,
    renderAllHardware,
    renderEditHardware,
    updateHardware,
    searchHardwareByName,
    searchHardwareByPrice,
    searchHardware,
    deleteRegisterHardware } = require('../controllers/hardware.controller');

//nuevo hardware
// router.get('/hardware/add', checkRoleAuth(['admin']), auth,renderHardwareForm);

router.post('/hardware/add', auth, checkRoleAuth(['admin']), createNewHardware); 


//obtener todos los harware
router.get('/hardware', auth, renderAllHardware);

//Todos los hardware
// Buscar hardware por nombre
router.get('/hardware/search/:name', auth, checkRoleAuth(['admin']), searchHardwareByName);

// Buscar hardware por precio
router.get('/hardware/search/price/:precio', auth, checkRoleAuth(['admin']), searchHardwareByPrice);

router.get('/hardware/search', auth, checkRoleAuth(['admin']), searchHardware);

// Editar el hardware
router.get('/hardware/edit/:id', auth, renderEditHardware) //muestra los registro unico seleccionado

router.put('/hardware/edit/:id', auth, checkRoleAuth(['admin']), updateHardware) //actualiza los registros

// Eliminar registros de hardware
router.delete('/hardware/delete/:id', auth, checkRoleAuth(['admin']), deleteRegisterHardware)

module.exports = router;