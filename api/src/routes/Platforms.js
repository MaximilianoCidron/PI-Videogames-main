const { Router } = require('express');
// Importar todos los routers;
const { getPlatforms } = require('../controllers/getPlatforms.controller.js');

const router = Router();
// Configurar los routers

router.get('/platforms', getPlatforms);

module.exports = router;