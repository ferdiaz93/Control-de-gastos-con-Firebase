const express = require('express');
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


    //Rutas de User
    //Agrega un nuevo usuario
    router.post('/registro', usuarioController.nuevoUsuario);
    //Obtiene un usuario por su Id
    router.post('/login', usuarioController.loguearUsuario);
    //Cierra sesion
    router.get('/logout', (req,res) => {
        req.session.destroy();
      })

    return router;
}


