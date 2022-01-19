import axios from "axios";

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const POST_GAME = "POST_GAME";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_PLATFORM = "FILTER_BY_PLATFORM";
export const FILTER_DB = "FILTER_DB";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const DELETE_GAME = "DELETE_GAME";

export const getAllGames = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: GET_ALL_GAMES,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getGamesByName = (name) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    return dispatch({
      type: GET_GAMES_BY_NAME,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getGameById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/videogame/${id}`);
    return dispatch({
      type: GET_GAME_BY_ID,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getGenres = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRES,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPlatforms = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/platforms");
    return dispatch({
      type: GET_PLATFORMS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postGame = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/videogame",
      payload
    );
    return dispatch({
      type: POST_GAME,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterByGenre = (payload) => {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
};

export const filterByPlatform = (payload) => {
  return {
    type: FILTER_BY_PLATFORM,
    payload,
  };
};

export const filterDB = (payload) => {
  return {
    type: FILTER_DB,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
};

export const deleteGame = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:3001/delete/${id}`);
    return dispatch({
      type: DELETE_GAME,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
}
