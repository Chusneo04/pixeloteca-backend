const express = require('express');
const router = express.Router();
const { eliminar_titulo, agregar_titulo, obtener_titulo, editar_titulo } = require('../controllers/titulosController')

router.delete('/eliminar_titulo/:id', eliminar_titulo)
router.post('/agregar_titulo', agregar_titulo)
router.get('/obtener_titulo/:id', obtener_titulo)
router.put('/editar_titulo', editar_titulo)
module.exports = router;