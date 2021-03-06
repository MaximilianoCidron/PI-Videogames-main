const { Router } = require('express');
// Importar todos los routers;
const { getVideogames } = require('../controllers/getVideogames.controller.js');
const { getVideogameById } = require('../controllers/getVideogameById.controller.js');
const { postVideogame } = require('../controllers/postVideogame.controller.js');
const { deleteVideogame } = require('../controllers/deleteVideogame.controller.js');

const router = Router();
// Configurar los routers

router.get('/videogames', getVideogames);

router.get('/videogame/:id', getVideogameById);

router.post('/videogame', postVideogame);

router.delete('/delete/:id', deleteVideogame);

module.exports = router;