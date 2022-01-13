import React from "react";
import { Link } from "react-router-dom"
import styles from "./card.module.css";

export default function Card({
    id,
    background_image,
    name,
    genres,
    rating,
}) {
    return (
        <div className={styles.card}>
            <Link to={`/videogame/${id}`}>
                <img src={background_image} alt={name} />
                 <div className={styles.card_info}>
                    <h3>{name}</h3>
                    <p>{genres.name.join(", ")}</p>
                    <p>{rating}</p>
                 </div>
            </Link>
        </div>
    )
}
