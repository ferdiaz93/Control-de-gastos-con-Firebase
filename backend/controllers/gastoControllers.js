const Gasto = require('../models/Gasto');
const Usuario = require('../models/usuario');
//Cuando se cree un nuevo gasto
exports.nuevoGasto = async( req, res, next ) => {
    
    //Creando obj de Gasto con los datos de req.body
    
    
        const gasto = new Gasto(req.body);
        console.log(req.session, "testeando");
        const usuario = await Usuario.findOneAndUpdate({ email: req.session.usuarioLogueado.email },
        {$push: {gastos: gasto}}, {
         new: true,
        });
        
        req.session.usuarioLogueado = usuario;
        
        return res.json({mensaje: 'el gasto se agregó correctamente'})

   
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