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
    searchHardwareByPrice,
    searchHardwareByName,
    searchByAnyPlace,
    deleteRegisterHardware } = require('../controllers/hardware.controller');

//busqueda por cualquier campo
router.get('/hardware/search/:key/:attribute', auth, searchByAnyPlace);
// router.get ('/searchByAnyPlace/key/attribute', auth, searchByAnyPlace)

//nuevo hardware
router.post('/hardware/add', auth, checkRoleAuth(['admin']), createNewHardware);

//Busca por precio
router.get('/hardware/search/precio/:precio', auth, searchHardwareByPrice);

// Buscar hardware por nombre
router.get('/hardware/search/:name', auth, searchHardwareByName);

//obtener todos los harware
router.get('/hardware', auth, renderAllHardware);

//Todos los hardware

// Editar el hardware
router.get('/hardware/edit/:id', auth, renderEditHardware) //muestra los registro unico seleccionado

router.put('/hardware/edit/:id', auth, checkRoleAuth(['admin']), updateHardware) //actualiza los registros

// Eliminar registros de hardware
router.delete('/hardware/delete/:id', auth, checkRoleAuth(['admin']), deleteRegisterHardware)

module.exports = router; 