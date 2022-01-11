require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre } = require("../db.js");

const getGenres = async (req, res, next) => {
  try {
    const DbGenres = await Genre.findAll();
    if (!DbGenres.length) {
      const ApiGenres = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      const genres = ApiGenres.data.results?.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      });
      const addGenres = await Genre.bulkCreate(genres);

      return res.status(200).json(addGenres);
    }
    return res.status(200).json(DbGenres);
  } catch (error) {
    next(new Error(`Error ${error.message}`));
  }
};

module.exports = { getGenres };
