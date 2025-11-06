const express = require('express');
const router = express.Router();
const { eliminar_titulo, agregar_titulo } = require('../controllers/titulosController')

router.delete('/eliminar_titulo/:id', eliminar_titulo)
router.post('/agregar_titulo', agregar_titulo)


module.exports = router;