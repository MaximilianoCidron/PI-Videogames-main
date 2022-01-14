import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions/index.js";
import Card from "../../components/Card/card.jsx";
import FilterDb from "../Filters/filterdb.jsx";
import FilterGenre from "../Filters/filtergenre.jsx";
import FilterPlatform from "../Filters/filterplatform.jsx";
import OrderByName from "../Order/ordername.jsx";
import OrderByRating from "../Order/orderrating.jsx";
import styles from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);

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

      <div>
        <FilterDb />
        <FilterGenre />
        <FilterPlatform />
        <OrderByName />
        <OrderByRating />
      </div>

      {allVideogames?.map((videogame) => {
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
  );
}
