require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Platform } = require("../db.js");

const getPlatforms = async (req, res, next) => {
  try {
    const DbPlatforms = await Platform.findAll();
    if (!DbPlatforms.length) {
      const ApiPlatforms = await axios.get(
        `https://api.rawg.io/api/platforms?key=${API_KEY}`
      );
      const platforms = ApiPlatforms.data.results?.map((platform) => {
        return {
          id: platform.id,
          name: platform.name,
        };
      });
      const addPlatforms = await Platform.bulkCreate(platforms);

      return res.status(200).json(addPlatforms);
    }
    return res.status(200).json(DbPlatforms);
  } catch (error) {
    next(new Error(`Error ${error.message}`));
  }
};

module.exports = { getPlatforms };
