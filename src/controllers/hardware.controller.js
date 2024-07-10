const Hardware = require('../models/hardware.js');

const hardwareController = {};


//busquedas por cualquier campo
hardwareController.searchByAnyPlace = async (req, res) => {
    const { key, attribute } = req.params;
    try {
        // Crear una expresión regular a partir del atributo sólo si la clave es de tipo String
        let search = {};
        if (key === 'name' || key === 'description' || key === 'marca' || key === 'modelo' || key === 'proveedor') {
            const searchRegex = new RegExp(attribute, 'i');
            search[key] = searchRegex;
        } else if (key === 'precio') {
            search[key] = Number(attribute);
        } else {
            return res.status(400).json({ message: 'Invalid search key.' });
        }

        const hardware = await Hardware.find(search);
        res.json(hardware);
    } catch (error) {
        res.status(500).json({ message: 'Error searching hardware by any place.', error });
    }
};


// Buscar hardware por precio (GET /hardware/search/price/:precio)
hardwareController.searchHardwareByPrice = async (req, res) => {
    const { precio } = req.params;
    try {
        const hardware = await Hardware.find({ precio: parseFloat(precio) });
        res.json(hardware);
    } catch (error) {
        res.status(400).json({ message: 'Error al buscar hardware por precio', error });
    }
};


// Renderizar el formulario para nuevo hardware (GET /hardware/add)
hardwareController.renderHardwareForm = (req, res) => {
    res.send('Formulario de nuevo hardware');
};
//busqueda por nombre
hardwareController.searchHardwareByName = async (req, res) => {
    const { name } = req.params;
    try {
        // Usar una expresión regular para búsqueda parcial y no sensible a mayúsculas/minúsculas
        const hardware = await Hardware.find({ name: { $regex: name, $options: 'i' } });
        res.json(hardware);
    } catch (error) {
        res.status(400).json({ message: 'Error al buscar hardware por nombre', error });
    }
};




// Crear nuevo hardware (POST /hardware/add)
hardwareController.createNewHardware = async (req, res) => {
    // const { name, description, precio, marca, modelo, proveedor } = req.body; // Asegúrate de que 'precio' esté en minúsculas
    try {
        const newHardware = new Hardware(req.body); // Asegúrate de que 'precio' esté en minúsculas
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