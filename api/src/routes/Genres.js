const { Router } = require('express');
// Importar todos los routers;
const { getGenres } = require('../controllers/getGenres.controller.js');

const router = Router();
// Configurar los routers

router.get('/genres', getGenres);

module.exports = router;