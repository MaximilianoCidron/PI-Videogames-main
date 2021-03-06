import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGameById,
  deleteGame,
  getAllGames,
} from "../../redux/actions/index.js";
import styles from "./detail.module.css";
import LoadingBar from "../../assets/LoadingBar.gif";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const videogames = useSelector((state) => state.videogame);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getGameById(id))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
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
  //     : rating >= 4 && rating <= 4.5
  //     ? (stars.rating = `${rating} ★★★★☆`)
  //     : rating > 4.5
  //     : (stars.rating = `${rating} ★★★★★`);
  //   return stars;
  // }

  // let parser = new DOMParser();
  // let doc = parser.parseFromString(detail.description, "text/html");
  // let description = doc.body.innerText;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return (
      <div>
        <img className={styles.loading} src={LoadingBar} alt="Loading" />
      </div>
    );
  }

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
            <div className={styles.description}>
              <div>About</div>
              {videogames[0].description}
            </div>
            <div className={styles.data}>
              <div>Released</div> {videogames[0].released}
            </div>
            <div className={styles.data}>
              <div>Rating</div>★{videogames[0].rating}
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
      ) : null}
    </div>
  );
}
