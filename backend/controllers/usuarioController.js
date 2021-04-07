const Usuario = require('../models/usuario');
const path = require('path');


exports.renderRegistro = async ( req,res ) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
}
exports.renderLogin = async ( req,res ) => {
    if (!req.session.usuarioLogueado) {
        return res.sendFile(path.join(__dirname, "../../frontend/login.html"));
    }
    res.redirect('/control-gastos');
}
exports.renderControlGastos = async ( req,res ) => {
    if (req.session.usuarioLogueado) {
       return res.sendFile(path.join(__dirname, "../../frontend/Control-gastos.html"));
    }
     res.redirect('/');
    
}
exports.renderPerfil = async ( req,res ) => {
    if (req.session.usuarioLogueado) {
        return res.sendFile(path.join(__dirname, "../../frontend/perfil.html"));
    }
      res.redirect('/');
}
exports.logout = async ( req, res ) => {
    req.session.destroy();
    return res.status(200).json({success: true});
}


//Cuando se cree un nuevo usuario
exports.nuevoUsuario = async( req, res, next ) => {
    const {email, password}  = req.body;
    
    const data = { 
        email,
        password,
        presupuesto: 0,
        restante: 0,
        nombre: "",
    }

    //Creando obj de usuario con los datos de req.body
    const usuario = new Usuario(data);
    try {
        await usuario.save();
        res.json({mensaje: 'el usuario se agregó correctamente'})
    } catch (error) {
        console.log(error);
        //Para que vaya a la siguiente funcion
        next();
    }
}


exports.loguearUsuario = async (req, res, next ) => {
    const { email, password } = req.body;
    
    //valida que los input no esten vacios
    if (!password || !email) {
        return res.status(400).json({ mensaje: "Todos los campos son requeridos"});
    };

    //Valida que el email ingresado ya esté registrado
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Email no registrado"});
        }
        if (usuario.password === password) {
            req.session.usuarioLogueado = usuario;
            return res.status(200).json({mensaje: "Usuario logueado", usuario:usuario});
        }else{
            return res.status(401).json({mensaje: "Usuario o contraseña incorrectos"});
        }        
}