require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre, Platform } = require("../db.js");
const { API_KEY } = process.env;

const getVideogames = async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    try {
      const gamesFromDb = await Videogame.findAll({
        where: {
          name: {
            [Op.or]: {
              [Op.like]: ` %${name}% `,
              [Op.iLike]: ` %${name} `,
              [Op.substring]: ` ${name} `,
              [Op.substring]: ` ${name[0].toUpperCase() + name.substring(1)} `,
            },
          },
        },
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
      const dataFromApi = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page=1`
      );
      dataFromApi.data.results.forEach((game) => {
        getFromApi.push(game);
      });

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

      if (!gamesFromDb.length) {
        const soloApiGames = gamesFromApi.slice(0, 15);
        res.status(200).json(soloApiGames);
      } else {
        const mergedApiDb = [...gamesFromDb, ...gamesFromApi].slice(0, 15);
        res.status(200).json(mergedApiDb);
      }
    } catch (error) {
      next(new Error(`Error ${error.message}`));
    }
  } else {
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

      if (!gamesFromDb.length) {
        res.status(200).json(gamesFromApi);
      } else {
        res.status(200).json(mergedApiDb);
      }
    } catch (error) {
      next(new Error(`Error ${error.message}`));
    }
  }
};

module.exports = { getVideogames };
