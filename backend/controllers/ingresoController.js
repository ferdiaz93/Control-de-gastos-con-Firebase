const Ingreso = require('../models/ingreso');
const Usuario = require('../models/usuario');
//Cuando se cree un nuevo ingreso
exports.crearYactualizarIngreso = async( req, res, next ) => {
    //Creando obj de Ingreso con los datos de req.body
        const {nombre, fecha, user_id, ingreso_id, cantidad} = req.body;
        if(!ingreso_id){
            const newIngreso = new Ingreso(req.body);
            await newIngreso.save();
            const ingresos = await Ingreso.find({user_id: req.body.user_id});
            return res.json({ingresos:ingresos, mensaje: 'el ingreso se agregó correctamente'})
        }
        const ingresoEditado = await Ingreso.findByIdAndUpdate(ingreso_id, { nombre, fecha, cantidad });
        return res.json({success: true, mensaje: 'Ingreso actualizado'});
}

//Obtiene todos los ingresos
exports.obtenerIngresos = async ( req, res, next ) => {
    try {
        const userId = req.params.id;
        const ingresos = await Ingreso.find({user_id: userId});
        res.json({success: true, mensaje: "operacion realizada", ingresos: ingresos});
    } catch (error) {
        console.log(error);
        next();
    }
}

//Obtiene un ingreso por su ID
exports.obtenerIngreso = async ( req, res, next ) =>{
    try {
        const ingreso = await Ingreso.findById( req.params.id );
        res.json(ingreso);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Actualiza un registro de ingreso por Id
exports.actualizarIngresos = async ( req, res, next ) => {
    try {
        const ingreso = await Ingreso.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true });
        res.json(ingreso);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Elimina un ingreso por su Id
exports.eliminarIngreso = async (req, res, next ) => {
    try {
        const ingresoId = req.body.ingresoId;
        const usuarioId = req.session.usuarioLogueado._id;
        console.log({ingresoId, usuarioId});
        const ingreso = await Ingreso.findByIdAndDelete(ingresoId);
        res.json({success: true, mensaje: 'El ingreso fué eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}