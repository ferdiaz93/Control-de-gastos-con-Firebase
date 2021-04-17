const router = require("express").Router();
const gastoController = require('../controllers/gastoControllers');
const usuarioController = require('../controllers/usuarioController');
const ingresoController = require('../controllers/ingresoController');


module.exports = function(){
    
    //Agrega nuevos gastos vía POST
    router.post('/api/gastos', gastoController.crearYactualizarGasto);
    //Obtiene todos los registros de gastos de la base de datos
    router.get('/api/gastos/:id', gastoController.obtenerGastos);
    //Obtiene gastos por Id
    // router.get('/api/gastos/:id', gastoController.obtenerGasto);
    //Actualiza un gasto por su Id
    router.put('/api/gastos/:id', gastoController.actualizarGastos);
    //Elimina un gasto por su Id
    router.post('/api/gastos-delete', gastoController.eliminarGasto);
    
    // Obtiene ingreso por su Id
    router.get('/api/ingreso', ingresoController.obtenerIngreso);
    // Obtiene todos los ingresos
    router.get('/api/ingresos', ingresoController.obtenerIngresos);
    //Elimina un ingresoo por su Id
    router.post('/api/ingresos-delete', ingresoController.eliminarIngreso);
    //Agrega nuevos ingresos vía POST
    router.post('/api/ingresos', ingresoController.crearYactualizarIngreso);

    router.get('/api/usuario/:id', usuarioController.obtenerUsuario);
    router.get('/api/get-presupuesto/:id', usuarioController.obtenerPresupuesto);


    router.post('/api/presupuesto', usuarioController.actualizarPresupuesto);

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


