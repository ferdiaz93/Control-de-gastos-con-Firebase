const Usuario = require('../models/usuario');
const Gasto = require('../models/gasto');
//Cuando se cree un nuevo gasto
exports.crearYactualizarGasto = async( req, res, next ) => {
    //Creando obj de Gasto con los datos de req.body
        const {categoria, nombre, fecha, gasto_id, cantidad} = req.body;
        if(!gasto_id){
            const newGasto = new Gasto(req.body);
            await newGasto.save();
            const gastos = await Gasto.find({user_id: req.body.user_id});
            return res.json({gastos:gastos, mensaje: 'el gasto se agregó correctamente'})
        }
        const gastoEditado = await Gasto.findByIdAndUpdate(gasto_id, { categoria, nombre, fecha, cantidad });
        return res.json({success: true, mensaje: 'Gasto actualizado'});
}

//Obtiene todos los gastos
exports.obtenerGastos = async ( req, res, next ) => {
    try {
        const userId = req.params.id;
        const gastos = await Gasto.find({user_id: userId});
        res.json({success: true, mensaje: "operacion realizada", gastos: gastos});
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
        const gastoId = req.body.gastoId;
        const usuarioId = req.session.usuarioLogueado._id;
        console.log({gastoId, usuarioId});
        const gasto = await Gasto.findByIdAndDelete(gastoId);
        res.json({success: true, mensaje: 'El gasto fué eliminado'});
        // const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, { $pull: {gastos: {_id: gastoId}}});
    } catch (error) {
        console.log(error);
        next();
    }
}