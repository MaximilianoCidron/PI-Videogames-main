require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db.js");

const getVideogameById = async (req, res, next) => {
  const { idVideogame } = req.params;
  try {
    if (idVideogame.includes("-")) {
      const videogame = await Videogame.findByPk(idVideogame, {
        include: [
          {
            model: Genre,
            as: "genres",
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Platform,
            as: "platforms",
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });
      if (!videogame) {
        return res.status(404).json({ message: "Videogame not found" });
      }
      return res.status(200).json(videogame);
    } else {
      const videogame = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      if (!videogame) {
        return res.status(404).json({ message: "Videogame not found" });
      }
      return res.status(200).json({
        id: videogame.data.id,
        name: videogame.data.name,
        background_image: videogame.data.background_image,
        description: videogame.data.description_raw,
        released: videogame.data.released,
        rating: videogame.data.rating,
        genres: videogame.data.genres?.map((genres) => {
          return {
            id: genres.id,
            name: genres.name,
          };
        }),
        platforms: videogame.data.platforms?.map((platforms) => {
          return {
            id: platforms.platform.id,
            name: platforms.platform.name,
          };
        }),
      });
    }
  } catch (error) {
    next(new Error(`Error ${error.message}`));
  }
};

module.exports = { getVideogameById };
