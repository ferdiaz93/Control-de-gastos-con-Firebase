require("dotenv").config();
// requiero un modulo
const express = require("express");
const routes = require("./routes/routes");
const exphbs = require('express-handlebars')
const path = require("path");

// Guardo el num de puerto
const PUERTO = process.env.PORT || 6969;

// ejecuto el modulo requerido y me devuelve un app
const app = express();
app.use("/", routes);

app.listen(PUERTO, () => {
  console.log(`Se prendio el puerto ${PUERTO}`);
});

app.engine('.handlebars', exphbs({
  //carpeta con plantillas
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.handlebars'

}))
//establezco cual va a a ser el motor de vistas
app.set('view engine', '.handlebars');