const Usuario = require('../models/usuario');
const Gasto = require('../models/gasto');
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
    const {email, password, uid_firebase}  = req.body;
    
    const data = { 
        email,
        password,
        uid_firebase,
        presupuesto: 0,
        restante: 0,
        nombre: "",
    }

    //Creando obj de usuario con los datos de req.body
    const usuario = new Usuario(data);
    try {
        const newUser = await usuario.save();
        req.session.usuarioLogueado = newUser;
        res.json({mensaje: 'el usuario se agregó correctamente', success: true, usuario: newUser});

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
            const gastos = await Gasto.find({user_id: usuario._id});
            return res.status(200).json({mensaje: "Usuario logueado", usuario:usuario, gastos: gastos});
        }else{
            return res.status(401).json({mensaje: "Usuario o contraseña incorrectos"});
        }        
}

exports.loguearConFirebase = async (req,res) =>{
    const { email, uid_firebase } = req.body;
    const usuario = await Usuario.findOne({ email: email, uid_firebase: uid_firebase });
    if (usuario) {
        req.session.usuarioLogueado = usuario;
        return res.status(200).json({success: true, usuario: usuario, mensaje: "usuario logueado"});
    }
    return res.status(200).json({success: false, mensaje: "usuario no logueado"});
}

exports.obtenerUsuario = async (req, res ) => {
    const idUsuario = req.params.id;
    const usuario = await Usuario.findById(idUsuario);
    const gastos = await Gasto.find({user_id: idUsuario});
    return res.status(200).json({usuario, gastos});
}