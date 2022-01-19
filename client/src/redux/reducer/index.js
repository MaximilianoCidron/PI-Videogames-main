import {
  GET_ALL_GAMES,
  GET_GAMES_BY_NAME,
  GET_GAME_BY_ID,
  GET_GENRES,
  GET_PLATFORMS,
  POST_GAME,
  FILTER_BY_GENRE,
  FILTER_BY_PLATFORM,
  FILTER_DB,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  DELETE_GAME,
} from "../actions/index.js";

const initialState = {
  videogames: [],
  filterVideogames: [],
  genres: [],
  platforms: [],
  videogame: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_GAMES: {
      return {
        ...state,
        videogames: payload,
        filterVideogames: payload,
      };
    }
    case GET_GAMES_BY_NAME: {
      return {
        ...state,
        videogames: payload,
      };
    }
    case GET_GAME_BY_ID: {
      return {
        ...state,
        videogame: payload,
      };
    }
    case GET_GENRES: {
      return {
        ...state,
        genres: payload,
      };
    }
    case GET_PLATFORMS: {
      return {
        ...state,
        platforms: payload,
      };
    }
    case POST_GAME: {
      return {
        ...state,
        videogames: [...state.videogames, payload],
      };
    }
    case FILTER_BY_GENRE: {
      const filterVideogames = state.filterVideogames;
      const genreFilter =
        payload === "All"
          ? filterVideogames
          : filterVideogames.filter((videogame) => {
              for (let i = 0; i < videogame.genres.length; i++) {
                if (videogame.genres[i].name === payload) {
                  return true;
                }
              }
              return false;
            });
      return {
        ...state,
        videogames: genreFilter,
      };
    }
    case FILTER_BY_PLATFORM: {
      const filterVideogames = state.filterVideogames;
      const platformFilter =
        payload === "All"
          ? filterVideogames
          : filterVideogames.filter((videogame) => {
              for (let i = 0; i < videogame.platforms.length; i++) {
                if (videogame.platforms[i].name === payload) {
                  return true;
                }
              }
              return false;
            });
      return {
        ...state,
        videogames: platformFilter,
      };
    }
    case FILTER_DB: {
      const filterVideogames = state.filterVideogames;
      const filterDb =
        payload === "Created"
          ? filterVideogames.filter((videogame) => videogame.createdInDb)
          : filterVideogames.filter((videogame) => !videogame.createdInDb);
      return {
        ...state,
        videogames: payload === "All" ? filterVideogames : filterDb,
      };
    }
    case ORDER_BY_NAME: {
      const sortedByName =
        payload === "A-Z"
          ? [...state.videogames].sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
          : [...state.videogames].sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: payload === "-" ? state.videogames : sortedByName,
      };
    }
    case ORDER_BY_RATING: {
      const sortedByRating =
        payload === "High"
          ? [...state.videogames].sort((a, b) => b.rating - a.rating)
          : [...state.videogames].sort((a, b) => a.rating - b.rating);
      return {
        ...state,
        videogames: payload === "-" ? state.videogames : sortedByRating,
      };
    }
    case DELETE_GAME: {
      return {
        ...state,
        videogames: [...state.videogames, payload],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

export default rootReducer;
