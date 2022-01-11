const { Router } = require('express');
// Importar todos los routers;
const { getVideogames } = require('../controllers/getVideogames.controller.js');
const { getVideogameById } = require('../controllers/getVideogameById.controller.js');
const { postVideogame } = require('../controllers/postVideogame.controller.js');

const router = Router();
// Configurar los routers

router.get('/videogames', getVideogames);

router.get('/videogame/:idVideogame', getVideogameById);

router.post('/videogame', postVideogame);

module.exports = router;