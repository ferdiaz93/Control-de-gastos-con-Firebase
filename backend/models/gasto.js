const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gastoSchema = new Schema ({
    categoria:{
        type: String,
        trim: true,
    },
    nombre:{
        type: String,
        trim: true,
    },
    cantidad:{
        type: Number,
        trim: true,
    },
    fecha:{
        type: String
    },
    user_id:{
        type: String
    }
});

module.exports = mongoose.model('Gasto', gastoSchema);

