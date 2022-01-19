require("dotenv").config();
const { Videogame } = require("../db.js");

const deleteVideogame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const videogameDb = await Videogame.findByPk(id);
    if (!videogameDb) {
      return res.status(404).json({ message: "Videogame not found" });
    }
    await videogameDb.destroy();
    return res.status(200).json({ message: "Videogame deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { deleteVideogame };
