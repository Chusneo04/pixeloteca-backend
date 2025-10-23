const express = require('express');
const router = express.Router();
const { recuperarClave, nuevaClave } = require('../controllers/recuperar_claveController')

router.post('/recuperar_clave', recuperarClave);
router.post('/nueva_clave', nuevaClave);

module.exports = router;