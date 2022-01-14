import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, filterByGenre } from "../../redux/actions/index.js";
import styles from "./filter.module.css";

export default function FilterGenre() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleFilterGenre = (event) => {
    event.preventDefault();
    dispatch(filterByGenre(event.target.value));
  };

  return (
    <div className={styles.filter}>
      <span>Genre: </span>
      <select onChange={(event) => handleFilterGenre(event)}>
        <option default value="All">
          All
        </option>
        {genres?.map((genre) => {
          return (
            <option key={genre.name} value={genre.name}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
