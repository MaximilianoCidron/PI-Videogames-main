require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db.js");

const getVideogameById = async (req, res, next) => {
  const { id } = req.params;
  const apiInfoArray = [];
  try {
    if (id.includes("-")) {
      const videogame = await Videogame.findByPk(id, {
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
      return res.status(200).send([videogame]);
    } else {
      const apiInfo = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      apiInfoArray.push(apiInfo.data);

      const apiData = apiInfoArray.map((game) => {
        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          description: game.description_raw,
          released: game.released,
          rating: game.rating,
          genres: game.genres?.map((genres) => {
            return {
              name: genres.name,
            };
          }),
          platforms: game.platforms?.map((platforms) => {
            return {
              name: platforms.platform.name,
            };
          }),
        };
      });
      const videogame = apiData.filter((game) => game.id == id);

      if (!videogame) {
        return res.status(404).json({ message: "Videogame not found" });
      }
      return res.status(200).send(videogame);
    }
  } catch (error) {
    next(new Error(`Error ${error.message}`));
  }
};

module.exports = { getVideogameById };
