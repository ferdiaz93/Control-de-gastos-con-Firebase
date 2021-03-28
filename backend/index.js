require("dotenv").config();
// requiero un modulo
const express = require("express");
const mongoose = require('mongoose');
const routes = require("./routes/routes");
const bodyParser = require('body-parser');



// Guardo el num de puerto
const PUERTO = process.env.PORT || 3000;

// ejecuto el modulo requerido y me devuelve un app
const app = express();

//Conectando a mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gastosDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

//Habilitando body-parser extrae la peticion que se envia al server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Habilitando routing 
app.use("/", routes());

// Encendiendo el servidor
app.listen(PUERTO, () => {
  console.log(`Se prendio el puerto ${PUERTO}`);
});
