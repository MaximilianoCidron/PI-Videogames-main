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

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);

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
    dispatch(getAllGames());
  }, [dispatch]);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getAllGames());
  };

  return (
    <div>
      <button
        onClick={(event) => {
          handleClick(event);
        }}
      >
        Reload games
      </button>

      <div className={styles.filters}>
        <FilterDb />
        <FilterGenre />
        <FilterPlatform />
        <OrderByName />
        <OrderByRating />
      </div>

      <div className={styles.cards}>
        {currentVideogames?.map((videogame) => {
          return (
            <Card
              background_image={videogame.background_image}
              name={videogame.name}
              genres={videogame.genres}
              rating={videogame.rating}
            />
          );
        })}
      </div>

      <Paginate
        recipesPerPage={videogamesPerPage}
        allRecipes={allVideogames.length}
        paginate={paginate}
      />
    </div>
  );
}
