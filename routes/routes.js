const express = require('express');
const router = require("express").Router();
const gastoController = require('../controllers/gastoControllers');


module.exports = function(){

    //Agrega nuevos gastos vía POST
    router.post('/gastos', gastoController.nuevoGasto);

    //Obtiene todos los registros de gastos de la base de datos
    router.get('/gastos', gastoController.obtenerGastos);

    // //Renderiza index
    // router.get('/', (req,res)=>{
    //     res.render('index')
    // });

    return router;
}


