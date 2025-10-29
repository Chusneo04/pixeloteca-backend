const Titulo = require('../models/Titulo');
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

module.exports = {eliminar_titulo}