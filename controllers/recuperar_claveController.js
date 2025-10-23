const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken'); 
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

const recuperarClave = async (req, res) => {
    const {email} = req.body;
    try {
        if (!email) {
            return res.status(400).json({message:'Debes introducir un correo electrónico para recuperar tu clave'});
        };

        const usuarioExiste = await Usuario.findOne({email});

        if (!usuarioExiste) {
            return res.status(404).json({message:'El usuario no existe'});
        };

        const token = jwt.sign(
            {id:usuarioExiste._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )

        const enlace = `${process.env.FRONTEND}/nueva_clave`

        transporter.sendMail({
            from: `Pixeloteca ${process.env.EMAIL_USER}`,
            to:email,
            subject: 'Enlace de recuperación de clave',
            html: `
                <h1>Recuperación de clave</h1>
                <p>Para recuperar tu contraseña pulsa aqui:</p>
                <a href="${enlace}">Recuperación</a>
            `
        })

        return res.status(200).json({token, message:'Enlace enviado correctamente. Revisa el correo'})


    } catch (error) {
        console.error("Error en recuperación de clave:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const nuevaClave = async (req, res) => {
    const {clave, claveConfirmar, token} = req.body;
    
    
    try {
        if (!clave || !claveConfirmar) {
            return res.status(400).json({message:'Debes introducir una clave'});
        };
        if (clave !== claveConfirmar) {
            return res.status(400).json({message:'Las claves deben coincidir'});
        };
        const token_extraido = jwt.verify(token, process.env.JWT_SECRET)
        const id = token_extraido.id
        const claveHasheada = await bcrypt.hash(clave, 10)
        await Usuario.updateOne({_id:id}, {$set:{clave:claveHasheada}});

        return res.status(200).json({message:'Clave actualizada correctamente. Inicia sesión'});

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({message:'Ha ocurrido un error interno de servidor'});
    }
}

module.exports = {recuperarClave, nuevaClave}