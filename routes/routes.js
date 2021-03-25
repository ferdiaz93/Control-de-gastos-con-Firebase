const routes = require("express").Router();
const registroController = require("../controllers/registroController");

// routes.get("/", registroController.mostrarRegistroForm);

routes.get('/', (req,res)=>{
    res.render('index')
});

module.exports = routes;
