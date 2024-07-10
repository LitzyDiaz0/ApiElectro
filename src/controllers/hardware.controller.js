const Hardware = require('../models/hardware.js');

const hardwareController = {};

// Renderizar el formulario para nuevo hardware (GET /hardware/add)
hardwareController.renderHardwareForm = (req, res) => {
    res.send('Formulario de nuevo hardware');
};

// Buscar hardware por nombre (GET /hardware/search/:name)
hardwareController.searchHardwareByName = async (req, res) => {
    const { name } = req.params; 
    try {
        const hardware = await Hardware.find({ name: new RegExp(name, 'i') }); // Búsqueda insensible a mayúsculas/minúsculas
        res.json(hardware);
    } catch (error) {
        res.status(400).json({ message: 'Error al buscar hardware', error });
    }
};

// Crear nuevo hardware (POST /hardware/add)
hardwareController.createNewHardware = async (req, res) => {
    const { name, description, precio } = req.body; // Asegúrate de que 'precio' esté en minúsculas
    try {
        const newHardware = new Hardware({ name, description, precio }); // Asegúrate de que 'precio' esté en minúsculas
        await newHardware.save();
        res.status(201).json({ message: 'Nuevo hardware creado', hardware: newHardware });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear nuevo hardware', error });
    }
};

// Obtener todos los hardware (GET /hardware)
hardwareController.renderAllHardware = async (req, res) => {
    try {
        const hardwares = await Hardware.find();
        res.json(hardwares);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener hardware', error });
    }
};

// Obtener hardware específico para editar (GET /hardware/edit/:id)
hardwareController.renderEditHardware = async (req, res) => {
    const { id } = req.params;
    try {
        const hardware = await Hardware.findById(id);
        if (!hardware) {
            return res.status(404).json({ message: 'Hardware no encontrado' });
        }
        res.json(hardware);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener hardware', error });
    }
};

// Actualizar hardware (PUT /hardware/edit/:id)
hardwareController.updateHardware = async (req, res) => {
    const { id } = req.params;
    const { name, description, precio } = req.body; // Asegúrate de que 'precio' esté en minúsculas
    try {
        const hardware = await Hardware.findByIdAndUpdate(id, { name, description, precio }, { new: true }); // Asegúrate de que 'precio' esté en minúsculas
        if (!hardware) {
            return res.status(404).json({ message: 'Hardware no encontrado' });
        }
        res.json({ message: 'Hardware actualizado', hardware });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar hardware', error });
    }
};

// Eliminar hardware (DELETE /hardware/delete/:id)
hardwareController.deleteRegisterHardware = async (req, res) => {
    const { id } = req.params;
    try {
        const hardware = await Hardware.findByIdAndDelete(id);
        if (!hardware) {
            return res.status(404).json({ message: 'Hardware no encontrado' });
        }
        res.json({ message: 'Hardware eliminado', hardware });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar hardware', error });
    }
};

module.exports = hardwareController;
