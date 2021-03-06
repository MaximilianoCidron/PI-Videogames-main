import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions/index.js";
import Card from "../../components/Card/card.jsx";
import Paginate from "./paginate.jsx";
import FilterDb from "../Filters/filterdb.jsx";
import FilterGenre from "../Filters/filtergenre.jsx";
import FilterPlatform from "../Filters/filterplatform.jsx";
import OrderByName from "../Order/ordername.jsx";
import OrderByRating from "../Order/orderrating.jsx";
import styles from "./home.module.css";
import LoadingBar from "../../assets/LoadingBar.gif";
import RefreshGif from "../../assets/RefreshGif.gif";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllGames())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [dispatch]);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getAllGames());
  };

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
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.filters}>
            <FilterDb />
            <FilterGenre />
            <FilterPlatform />
            <OrderByName />
            <OrderByRating />
            <button
              className={styles.reload}
              onClick={(event) => {
                handleClick(event);
              }}
            >
              <img src={RefreshGif} alt="Refresh" height="50px" width="50px" />
            </button>
          </div>

          <div className={styles.cards}>
            {currentVideogames?.map((videogame) => {
              return (
                <div key={videogame.id}>
                  <Card
                    id={videogame.id}
                    key={videogame.id}
                    background_image={videogame.background_image}
                    name={videogame.name}
                    genres={videogame.genres}
                    rating={videogame.rating}
                    createdInDb={videogame.createdDb}
                  />
                </div>
              );
            })}
          </div>

          <Paginate
            recipesPerPage={videogamesPerPage}
            allRecipes={allVideogames.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}
