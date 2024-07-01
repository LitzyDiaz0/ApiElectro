const { Router } = require('express');
const router = Router();

const { 
    renderHardwareForm, 
    createNewHardware, 
    renderAllHardware, 
    renderEditHardware, 
    updateHardware, 
    deleteRegisterHardware } = require('../controllers/hardware.controller');
    
//nuevo hardware
router.get('/hardware/add', renderHardwareForm);

router.post('/hardware/add', createNewHardware);


//obtener todos los harware
router.get('/hardware', renderAllHardware);

//Todos los hardware

// Editar el hardware
router.get('/hardware/edit/:id', renderEditHardware) //muestra los registros

router.put('/hardware/edit/:id', updateHardware) //actualiza los registros

// Eliminar registros de hardware
router.delete('/hardware/delete/:id', deleteRegisterHardware)

module.exports = router;