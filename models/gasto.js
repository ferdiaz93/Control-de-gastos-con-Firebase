const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gastoSchema = new Schema ({
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
    presupuesto:{
        type: Number,
        trim: true,
    },
    restante:{
        type: Number,
        trim: true
    }
});

module.exports = mongoose.model('Gasto', gastoSchema);

