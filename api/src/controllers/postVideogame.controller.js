require("dotenv").config();
const { Videogame, Genre, Platform } = require("../db.js");

const postVideogame = async (req, res, next) => {
  const {
    name,
    background_image,
    description,
    released,
    rating,
    genres,
    platforms,
    createdInDb,
  } = req.body;
  try {
    const newVideogame = await Videogame.create({
      name,
      background_image,
      description,
      released,
      rating: parseFloat(rating),
      createdInDb,
    });
    const genresDb = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    const platformsDb = await Platform.findAll({
      where: {
        name: platforms,
      },
    });
    await newVideogame.addGenres(genresDb);
    await newVideogame.addPlatforms(platformsDb);

    return res.status(201).json({
      message: `Videogame ${name} successfully created`,
    });
  } catch (error) {
    next(new Error(`Error ${error.message}`));
  }
};

module.exports = { postVideogame };
