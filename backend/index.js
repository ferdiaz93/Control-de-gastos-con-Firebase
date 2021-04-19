require("dotenv").config();
// requiero un modulo
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require("./routes/routes");
const bodyParser = require('body-parser');
const cors = require('cors');
const expSession = require("express-session");


// Guardo el num de puerto
const PUERTO = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

//Conectando a mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://ioke:ioke1234@cluster0.betmu.mongodb.net/gastosDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

//Habilitando body-parser extrae la peticion que se envia al server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(
  expSession({
    secret: "I don't know about secrets",
    resave: false,
    saveUninitialized: false,
  })
);

//Habilitando routing 
app.use("/", routes());

//Archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

// Encendiendo el servidor
app.listen(PUERTO, () => {
  console.log(`Se prendio el puerto ${PUERTO}`);
});
