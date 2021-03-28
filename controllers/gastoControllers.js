const Gasto = require('../models/Gasto');

//Cuando se cree un nuevo gasto
exports.nuevoGasto = async( req, res, next ) => {
    
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
exports.obtenerGastos = async ( req, res, next ) => {
    try {
        const gastos = await Gasto.find({});
        res.json(gastos);
    } catch (error) {
        console.log(error);
        next();
    }

}

//Obtiene un gasto por su ID
exports.obtenerGasto = async ( req, res, next ) =>{
    try {
        const gasto = await Gasto.findById( req.params.id );
        res.json(gasto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Actualiza un registro de gasto por Id
exports.actualizarGastos = async ( req, res, next ) => {
    try {
        const gasto = await Gasto.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true });
        res.json(gasto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Elimina un gasto por su Id
exports.eliminarGasto = async (req, res, next ) => {
    try {
        const gasto = await Gasto.findOneAndDelete({ _id: req.params.id });
        res.json({ mensaje: 'El gasto fué eliminado'} );
    } catch (error) {
        console.log(error);
        next();
    }
}