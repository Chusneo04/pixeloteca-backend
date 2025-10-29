const express = require('express');
const router = express.Router();
const {perfil} = require('../controllers/perfilController');

router.get('/perfil/:token', perfil)

module.exports = router;