//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const axios = require("axios");
const { conn, Genre, Platform } = require("./src/db.js");
const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  // add Genres to the database
  const verifyGenres = await Genre.findAll();
  if (!verifyGenres.length) {
    const ApiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const addGenres = await Genre.bulkCreate(
      ApiGenres.data.results?.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      })
    );
  }
  // Add Platforms to the database
  const verifyPlatforms = await Platform.findAll();
  if (!verifyPlatforms.length) {
    const ApiPlatforms = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    const addPlatforms = await Platform.bulkCreate(
      ApiPlatforms.data.results?.map((platform) => {
        return {
          id: platform.id,
          name: platform.name,
        };
      })
    );
  }

  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
