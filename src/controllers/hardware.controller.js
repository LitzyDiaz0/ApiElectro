const hardwareController = {};


hardwareController.renderHardwareForm = (req, res) =>{
    res.send('Hardware añadido');
}

hardwareController.createNewHardware = (req, res) =>{
    res.send('nuevo hardware')
}

hardwareController.renderAllHardware = (req, res) =>{
    res.send('Todo el hardware');
}

hardwareController.renderEditHardware = (req, res)=>{
    res.send('Editar el hardware seleccionado')
} 

hardwareController.updateHardware = (req, res) =>{
    res.send('Hardware actualizado')
}

hardwareController.deleteRegisterHardware = (req, res) =>{
    res.send('Hardware eliminado')
}
module.exports = hardwareController;