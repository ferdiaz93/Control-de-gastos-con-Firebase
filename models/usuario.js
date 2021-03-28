const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema ({

    nombre: {
        type: String,
        trim: true
    },
    mail:{
        type: String,
        trim: true
    },
    presupuesto:{
        type: Number,
        trim: true
    },
    gasto:{
        type: Array,
        trim: true
    },
    restante:{
        type: Number,
        trim: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema)