require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db.js");
const { API_KEY } = process.env;

const getVideogames = async (req, res, next) => {
  const { name } = req.query;
  try {
    const gamesFromDb = await Videogame.findAll({
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

    let getFromApi = [];
    for (let i = 1; i <= 5; i++) {
      const dataFromApi = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
      );
      dataFromApi.data.results.forEach((game) => {
        getFromApi.push(game);
      });
    }
    const gamesFromApi = getFromApi.map((game) => {
      return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        //description: game.description,
        released: game.released,
        rating: game.rating,
        genres: game.genres.map((genre) => {
          return {
            name: genre.name,
          };
        }),
        platforms: game.platforms.map((platforms) => {
          return {
            name: platforms.platform.name,
          };
        }),
      };
    });

    const mergedApiDb = [...gamesFromDb, ...gamesFromApi];

    if (name) {
      const videogamesFiltered = mergedApiDb
        .filter((videogame) => {
          return videogame.name.toLowerCase().includes(name.toLowerCase());
        })
        .slice(0, 15);
      if (videogamesFiltered.length) {
        return res.status(200).json(videogamesFiltered);
      } else {
        return res.status(404).json({ message: "Videogame not found" });
      }
    }

    return res.status(200).json(mergedApiDb);
  } catch (error) {
    next(new Error(`Error ${error.message}`));
  }
};

module.exports = { getVideogames };
