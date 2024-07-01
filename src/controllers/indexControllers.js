const indexController = {};

indexController.renderIndex = (req, res) =>{
    res.send('Funcionando mi bro B)');
}

// indexController.renderHardware = (req, res) =>{
//     res.render('hardware')
// }

module.exports = indexController;