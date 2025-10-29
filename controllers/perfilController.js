const jwt = require('jsonwebtoken');
const Titulo = require('../models/Titulo');
const Usuario = require('../models/Usuario');

const perfil = async (req, res) => {
    try {
        const token = req.params.token
        const token_extraido = jwt.verify(token, process.env.JWT_SECRET)
        const id_usuario = token_extraido.id
        const usuario = await Usuario.findById(id_usuario)
        
        const titulos = await Titulo.find({id_usuario})

        

        return res.json({usuario, titulos})
        
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({message:'Error interno del servidor'})
    }
}

module.exports = {perfil}