require("dotenv").config();
// requiero un modulo
const express = require("express");

// Guardo el num de puerto
const PUERTO = process.env.PORT || 6969;

// ejecuto el modulo requerido y me devuelve un app
const app = express();

app.listen(PUERTO, () => {
  console.log(`Se prendio el puerto ${PUERTO}`);
});
