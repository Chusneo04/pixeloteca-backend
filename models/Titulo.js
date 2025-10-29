const mongoose = require('mongoose');

const tituloSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    fecha:{type:String, required:true},
    categoria:{type:String, required:true},
    id_usuario:{type:String, required:true}
});

module.exports = mongoose.model('Titulo', tituloSchema);