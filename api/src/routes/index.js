const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogamesRoutes = require('./Videogames.js');
const GenresRoutes = require('./Genres.js');
const PlatformsRoutes = require('./Platforms.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(VideogamesRoutes);
router.use(GenresRoutes);
router.use(PlatformsRoutes);

module.exports = router;
