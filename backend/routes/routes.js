const router = require("express").Router();
const gastoController = require('../controllers/gastoControllers');
const usuarioController = require('../controllers/usuarioController');


module.exports = function(){
    
    //Agrega nuevos gastos vía POST
    router.post('/gastos', gastoController.nuevoGasto);
    //Obtiene todos los registros de gastos de la base de datos
    router.get('/gastos', gastoController.obtenerGastos);
    //Obtiene gastos por Id
    router.get('/gastos/:id', gastoController.obtenerGasto);
    //Actualiza un gasto por su Id
    router.put('/gastos/:id', gastoController.actualizarGastos);
    //Elimina un gasto por su Id
    router.delete('/gastos/:id', gastoController.eliminarGasto);


    //Rutas de vistas

    router.get('/', usuarioController.renderRegistro);
    router.get('/login', usuarioController.renderLogin);
    router.get('/Control-gastos', usuarioController.renderControlGastos);
    router.get('/perfil', usuarioController.renderPerfil);

    router.post('/registro', usuarioController.nuevoUsuario);
    //Obtiene un usuario por su Id
    router.post('/login', usuarioController.loguearUsuario);
    //Cierra sesion
    router.get('/logout', usuarioController.logout);
   
    return router;
}


