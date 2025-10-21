const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const claveValida = /(?=.*\d)(?=.*[!@#$%^&*()])/;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})


const register = async (req, res) => {
    
    const {nombre, email, clave} = req.body;
    try {
        
        if (!nombre || !email || !clave) {
            return res.status(400).json({'message':'Todos los campos son obligatorios'});
        };
        
        if (!email.includes('@')) {
            return res.status(400).json({'message':'El correo electrónico tiene un formato incorrecto'})
        }

        if (clave.length < 6 || clave.length > 30) {
            return res.status(400).json({'message':'La clave debe tener entre 6 y 30 caracteres' })
        }

        if (!claveValida.test(clave)) {
            return res.status(400).json({'message':'La clave debe contener al menos un simbolo y un numero'})
        }

        const usuarioExiste = await Usuario.findOne({ email })
        
        if (usuarioExiste) {
            return res.status(409).json({'message':'El usuario ya existe'});
        };
        
        const claveHasheada = await bcrypt.hash(clave, 10);
        const nuevoUsuario = new Usuario({nombre, email, clave:claveHasheada});
        await nuevoUsuario.save();
        
        await transporter.sendMail({
            from: `"Pixeloteca" ${process.env.EMAIL_USER}`,
            to: email,
            subject: 'Bienvenido a Pixeloteca',
            html: `
                <h1>Hola ${nombre}</h1>
                <p>Tu cuenta ha sido creada satisfactoriamente</p>
                <p>Gracias por unirte a pixeloteca, aqui encontrarás una manera muy sencilla de organizar tus peliculas, videojuegos y libros</p>
            `
        })
        
        const token = jwt.sign(
            {id:nuevoUsuario._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.status(201).json({
            message:'Registro exitoso',
            token,
            usuario:{
                id:nuevoUsuario._id,
                nombre:nuevoUsuario.nombre,
                email:nuevoUsuario.email
            }
        });
    }catch (error){
        console.log('Error en el registro: ', error);
        res.status(500).json({message:'Error interno del servidor'})
        
    }
}

module.exports = {register}