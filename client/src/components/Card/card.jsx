import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

export default function Card({ id, background_image, name, genres, rating }) {
  return (
    <div className={styles.card}>
      <Link to={`/videogame/${id}`}>
        <img src={background_image} alt={name} width="350" height="200" />
        <h3>{name}</h3>
      </Link>
      <div className={styles.card_info}>
        <p>{genres.map((genre) => `${genre.name} `).join(" / ")}</p>
        <p>{rating}</p>
      </div>
    </div>
  );
}
