const { Router } = require('express');
const router = Router();
const auth = require('../middlewares/auth');
const {
    renderHardwareForm,
    createNewHardware,
    renderAllHardware,
    renderEditHardware,
    updateHardware,
    deleteRegisterHardware } = require('../controllers/hardware.controller');

//nuevo hardware
router.get('/hardware/add', auth,renderHardwareForm);

router.post('/hardware/add', auth, createNewHardware);


//obtener todos los harware
router.get('/hardware', auth, renderAllHardware);

//Todos los hardware

// Editar el hardware
router.get('/hardware/edit/:id', auth, renderEditHardware) //muestra los registros

router.put('/hardware/edit/:id', auth, updateHardware) //actualiza los registros

// Eliminar registros de hardware
router.delete('/hardware/delete/:id', auth, deleteRegisterHardware)

module.exports = router;