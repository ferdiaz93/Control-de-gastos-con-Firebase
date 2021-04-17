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
    },
    user_id:{
        type: String
    }
});

module.exports = mongoose.model('Ingreso', ingresoSchema);

