import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameById } from "../../redux/actions/index.js";
//import styles from "./detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const videogames = useSelector((state) => state.videogame);
  console.log(videogames);

  useEffect(() => {
    dispatch(getGameById(id));
  }, [dispatch, id]);

  // let parser = new DOMParser();
  // let doc = parser.parseFromString(detail.description, "text/html");
  // let description = doc.body.innerText;

  return (
    <div>
      {videogames[0] ? (
        <div>
          <h2>Name: {videogames[0].name} </h2>
          <img
            src={videogames[0].background_image}
            alt={`${videogames[0].background_image}.jpg`}
            width="600px"
            height="400px"
          />
          <h3>Description: {videogames[0].description}</h3>
          <h3>Released: {videogames[0].released}</h3>
          <h3>Rating: {videogames[0].rating}</h3>
          <h3>Genres: {videogames[0].genres.map((genre) => genre.name).join(" / ")}</h3>
          <h3>Platforms: {videogames[0].platforms.map((platform) => platform.name).join(" / ")}</h3>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
