const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema ({

    nombre: {
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true
    },
    password:{
        type: String,
        trim: true
    },
    presupuesto:{
        type: Number,
        trim: true
    },
    gastos:{
        type: Array
    },
    restante:{
        type: Number,
        trim: true
    },
    uid_firebase:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);