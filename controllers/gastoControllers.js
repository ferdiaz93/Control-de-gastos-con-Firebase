const Gasto = require('../models/Gasto');

//Cuando se cree un nuevo gasto
exports.nuevoGasto = async(req, res, next) => {
    
    //Creando obj de Gasto con los datos de req.body
    const gasto = new Gasto(req.body);

    try {
        await gasto.save();
        res.json({mensaje: 'el cliente se agregó correctamente'})
    } catch (error) {
        console.log(error);
        //Para que vaya a la siguiente funcion
        next();
    }
    
}

//Obtiene todos los gastos
exports.obtenerGastos = async (req, res, next) => {
    try {
        const gastos = await Gasto.find({});
        res.json(gastos);
    } catch (error) {
        console.log(error);
        next();
    }
}