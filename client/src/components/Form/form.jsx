import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postGame,
  getGenres,
  getPlatforms,
} from "../../redux/actions/index.js";
import styles from "./form.module.css";

function validate(input) {
  const errors = {};
  !input.name ? (errors.name = "Name is required") : (errors.name = "");
  !input.background_image || typeof input.background_image !== "string"
    ? (errors.background_image = "Image is required")
    : (errors.background_image = "");
  !input.description
    ? (errors.description = "Description is required")
    : (errors.description = "");
  !input.released
    ? (errors.released = "Release date is required")
    : (errors.released = "");
  !input.rating || input.rating < 0 || input.rating > 5
    ? (errors.rating = "Rating is required and must be between 0 and 5")
    : (errors.rating = "");
  !input.genres || input.genres.length === 0
    ? (errors.genres = "Genre/s are required")
    : (errors.genres = "");
  !input.platforms || input.platforms.length === 0
    ? (errors.platforms = "Platform/s are required")
    : (errors.platforms = "");
  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    background_image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleGenreSelect = (event) => {
    setInput({
      ...input,
      genres: [...input.genres, event.target.value],
    });
    setErrors(
      validate({
        ...input,
        [event.target.genres]: event.target.value,
      })
    );
  };

  const handlePlatformSelect = (event) => {
    setInput({
      ...input,
      platforms: [...input.platforms, event.target.value],
    });
    setErrors(
      validate({
        ...input,
        [event.target.platforms]: event.target.value,
      })
    );
  };

  const handleGenreDelete = (element) => {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== element),
    });
  };

  const handlePlatformDelete = (element) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((platform) => platform !== element),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postGame(input));
    alert("Game added!");
    setInput({
      name: "",
      background_image: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  };

  return (
    <div className={styles.background}>
      <h1>Add a new videogame!</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(event) => handleChange(event)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Image: </label>
          <input
            type="url"
            value={input.background_image}
            name="background_image"
            onChange={(event) => handleChange(event)}
          />
          {errors.background_image && <p>{errors.background_image}</p>}
        </div>

        <div>
          <label>Description: </label>
          <textarea
            type="text"
            value={input.description}
            name="description"
            onChange={(event) => handleChange(event)}
            rows="10"
            cols="50"
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label>Released: </label>
          <input
            type="date"
            value={input.released}
            name="released"
            min="1958-10-01"
            //max="2030-12-31"
            onChange={(event) => handleChange(event)}
          />
          {errors.released && <p>{errors.released}</p>}
        </div>

        <div>
          <label>Rating: </label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            min="0"
            max="5"
            step="0.01"
            onChange={(event) => handleChange(event)}
          />
          {errors.rating && <p>{errors.rating}</p>}
        </div>

        <div>
          <label>Genres: </label>
          <select
            onChange={(event) => {
              handleGenreSelect(event);
            }}
          >
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
          <ul>
            {input.genres.map((genre) => (
              <li>
                <div>
                  {genre}
                  <button
                    type="button"
                    onClick={() => handleGenreDelete(genre)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {errors.genres && <p>{errors.genres}</p>}
        </div>

        <div>
          <label>Platforms: </label>
          <select
            onChange={(event) => {
              handlePlatformSelect(event);
            }}
          >
            {platforms.map((platform) => (
              <option value={platform.name}>{platform.name}</option>
            ))}
          </select>
          <ul>
            {input.platforms.map((platform) => (
              <li>
                <div>
                  {platform}
                  <button
                    type="button"
                    onClick={() => handlePlatformDelete(platform)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {errors.platforms && <p>{errors.platforms}</p>}
        </div>

        {errors &&
        (errors.name ||
          errors.background_image ||
          errors.description ||
          errors.released ||
          errors.rating ||
          errors.genres ||
          errors.platforms) ? (
          <p>Please fill in all the fields correctly</p>
        ) : (
          <div>
            <button type="submit">Save</button>
          </div>
        )}
      </form>
    </div>
  );
}
