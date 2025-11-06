const Titulo = require('../models/Titulo');
const jwt = require('jsonwebtoken');
const { findByIdAndDelete } = require('../models/Usuario');

const eliminar_titulo = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await Titulo.findByIdAndDelete(id)
        if (resultado) {
            console.log('Entra en la eliminacion');
            
            return res.status(200).json({message:'Título eliminado correctamente'})
        } else {
            console.log('no Entra en la eliminacion');

            return res.status(404).json({message:'No se ha podido encontrar'})
        }

    } catch (error) {
        console.log('Esta ocurriendo un error');
        
        return res.status(500).json({message:'Ha ocurrido un error interno del servidor'})
        
    }
}

const agregar_titulo = async (req, res) => {
    const {titulo, categoria, token} = req.body;
    try {
        const ahora = new Date();
        const mes = ahora.getMonth() + 1
        const año = ahora.getFullYear()
        const dia = ahora.getDay()
        const fecha = `${dia}/${mes}/${año}`

        

        const token_extraido = jwt.verify(token, process.env.JWT_SECRET)
        const id_usuario = token_extraido.id
        
        const nuevoTitulo = new Titulo({titulo, fecha, categoria, id_usuario})

        
        await nuevoTitulo.save()
        
        return res.status(200).json({message:'Titulo añadido correctamente'})
    } catch (error) {
        return res.status(500).json({message:'Ha ocurrido un error interno en el servidor'})
    }
    
    
}

module.exports = {eliminar_titulo, agregar_titulo}