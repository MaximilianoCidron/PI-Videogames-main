import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

export default function Card({
  id,
  background_image,
  name,
  genres,
  rating,
  createdInDb,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to={`/videogame/${id}`}>
          <img
            className={styles.image}
            src={background_image}
            alt={name}
            width="500"
            height="300"
          />
          <h3>{name}</h3>
        </Link>
        <div className={styles.card_info}>
          <p className={styles.rating}>⭐{rating}</p>
          <h3 className={styles.genres}>
            {genres.map((genre) => `${genre.name} `).join(" - ")}
          </h3>
        </div>
      </div>
    </div>
  );
}
