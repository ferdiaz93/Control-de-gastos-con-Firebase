const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingresoSchema = new Schema ({
    nombre:{
        type: String,
        trim: true,
    },
    cantidad:{
        type: Number,
        trim: true,
    },
    fecha:{
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Ingreso', ingresoSchema);

