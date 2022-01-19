import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGameById,
  deleteGame,
  getAllGames,
} from "../../redux/actions/index.js";
import styles from "./detail.module.css";
import Loading from "../../assets/Loading.gif";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const videogames = useSelector((state) => state.videogame);

  useEffect(() => {
    dispatch(getGameById(id));
  }, [dispatch, id]);

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteGame(id));
    dispatch(getAllGames());
    alert("Game deleted");
    history.push("/home");
  };

  // function RatingStars(rating) {
  //   const stars = {};
  //   rating >= 1 && rating < 2
  //     ? (stars.rating = `${rating} ★☆☆☆☆`)
  //     : rating >= 2 && rating < 3
  //     ? (stars.rating = `${rating} ★★☆☆☆`)
  //     : rating >= 3 && rating < 4
  //     ? (stars.rating = `${rating} ★★★☆☆`)
  //     : rating >= 4 && rating < 5
  //     ? (stars.rating = `${rating} ★★★★☆`)
  //     : (stars.rating = `${rating} ★★★★★`);
  //   return stars;
  // }

  // let parser = new DOMParser();
  // let doc = parser.parseFromString(detail.description, "text/html");
  // let description = doc.body.innerText;

  return (
    <div className={styles.loading_background}>
      {videogames[0] ? (
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.name}> {videogames[0].name} </div>
            <img
              className={styles.image}
              src={videogames[0].background_image}
              alt={`${videogames[0].background_image}.jpg`}
              width="950px"
              height="600px"
            />
            <text className={styles.description}>
              <div>Description</div>
              {videogames[0].description}
            </text>
            <div className={styles.data}>
              <div>Released</div> {videogames[0].released}
            </div>
            <div className={styles.data}>
              <div>Rating</div> {videogames[0].rating}
            </div>
            <div className={styles.data}>
              <div>Genres</div>
              {videogames[0].genres.map((genre) => genre.name).join(", ")}
            </div>
            <div className={styles.data}>
              <div>Platforms</div>
              {videogames[0].platforms
                .map((platform) => platform.name)
                .join(", ")}
            </div>
            {videogames[0].createdInDb === true ? (
              <div>
                <button
                  className={styles.delete_button}
                  onClick={(e) => handleDelete(e)}
                >
                  DELETE GAME
                </button>
              </div>
            ) : (
              <div className={styles.create_button}>
                <Link to="/videogame">ADD YOUR OWN GAME</Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <img className={styles.loading} src={Loading} alt="Loading" />
        </div>
      )}
    </div>
  );
}
