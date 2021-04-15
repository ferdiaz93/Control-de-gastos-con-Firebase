const Ingreso = require('../models/Ingreso');
const Usuario = require('../models/usuario');
//Cuando se cree un nuevo gasto
exports.nuevoIngreso = async( req, res, next ) => {
    
    //Creando obj de ingreso con los datos de req.body
    
    
        const ingreso = new Ingreso(req.body);
        console.log(req.session, "testeando");
        const usuario = await Usuario.findOneAndUpdate({ email: req.session.usuarioLogueado.email },
        {$push: {ingresos: ingreso}}, {
         new: true,
        });
         //actualiza la sesion con el nuevo ingreso
        req.session.usuarioLogueado = usuario;
        
        return res.json({mensaje: 'el ingreso se agregó correctamente'})

   
}