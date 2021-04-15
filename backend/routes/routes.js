const router = require("express").Router();
const gastoController = require('../controllers/gastoControllers');
const usuarioController = require('../controllers/usuarioController');
const ingresoController = require('../controllers/ingresoController');


module.exports = function(){
    
    //Agrega nuevos gastos vía POST
    router.post('/gastos', gastoController.nuevoGasto);
    //Obtiene todos los registros de gastos de la base de datos
    router.get('/gastos', gastoController.obtenerGastos);
    //Obtiene gastos por Id
    router.get('/api/gastos/:id', gastoController.obtenerGastos);
    //Actualiza un gasto por su Id
    router.put('/gastos/:id', gastoController.actualizarGastos);
    //Elimina un gasto por su Id
    router.post('/api/gastos-delete', gastoController.eliminarGasto);

    router.get('/api/usuario/:id', usuarioController.obtenerUsuario);

    //Agrega nuevos ingresos vía POST
    router.post('/ingresos', ingresoController.nuevoIngreso);

    //Rutas de vistas

    router.get('/registro', usuarioController.renderRegistro);
    router.get('/', usuarioController.renderLogin);
    router.get('/Control-gastos', usuarioController.renderControlGastos);
    router.get('/perfil', usuarioController.renderPerfil);

    router.post('/loginFb', usuarioController.loguearConFirebase);
    router.post('/registro', usuarioController.nuevoUsuario);
    //Obtiene un usuario por su Id
    router.post('/login', usuarioController.loguearUsuario);
    //Cierra sesion
    router.get('/logout', usuarioController.logout);
   
    return router;
}


