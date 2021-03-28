const Usuario = require('../models/usuario');

//Cuando se cree un nuevo usuario
exports.nuevoUsuario = async( req, res, next ) => {
    
    //Creando obj de usuario con los datos de req.body
    const usuario = new Usuario(req.body);

    try {
        await usuario.save();
        res.json({mensaje: 'el usuario se agregó correctamente'})
    } catch (error) {
        console.log(error);
        //Para que vaya a la siguiente funcion
        next();
    }
    
}