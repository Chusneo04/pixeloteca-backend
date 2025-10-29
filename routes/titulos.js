const express = require('express');
const router = express.Router();
const { eliminar_titulo } = require('../controllers/titulosController')

router.delete('/eliminar_titulo/:id', eliminar_titulo)



module.exports = router;