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
  !input.name || !/^[A-Za-z0-9:;,.<>/?'"() -_ ]+$/.test(input.name)
    ? (errors.name = "*Name is required and must contain text")
    : (errors.name = "");
  !input.background_image || typeof input.background_image !== "string"
    ? (errors.background_image = "*Image URL is required")
    : (errors.background_image = "");
  !input.description ||
  !/^[A-Za-z0-9:;,.<>/?'"() ü é á í ó ú -_ ]+$/.test(input.description)
    ? (errors.description = "*Description is required and must contain text")
    : (errors.description = "");
  !input.released
    ? (errors.released = "*Release date is required")
    : (errors.released = "");
  !input.rating || input.rating < 0 || input.rating > 5
    ? (errors.rating = "*Rating is required and must be between 0 and 5")
    : (errors.rating = "");
  !input.genres || input.genres.length <= 0
    ? (errors.genres = "*Genre/s are required")
    : (errors.genres = "");
  !input.platforms || input.platforms.length <= 0
    ? (errors.platforms = "*Platform/s are required")
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
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
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
    if (genres.length < 1) {
      alert("Must select at least one Genre");
      return;
    }
    if (platforms.length < 1) {
      alert("Must select at least one Platform");
      return;
    }
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
      <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
        <h1 className={styles.label}>Add a new videogame!</h1>
        <div>
          <h2 className={styles.label}>
            Name
            {errors.name && <p className={styles.label_error}>{errors.name}</p>}
          </h2>

          <input
            className={styles.input}
            type="text"
            value={input.name}
            name="name"
            onChange={(event) => handleChange(event)}
            autoComplete="off"
          />
        </div>

        <div>
          <h2 className={styles.label}>
            Image
            {errors.background_image && (
              <p className={styles.label_error}>{errors.background_image}</p>
            )}
          </h2>
          <input
            className={styles.input}
            type="url"
            value={input.background_image}
            name="background_image"
            onChange={(event) => handleChange(event)}
            autoComplete="off"
          />
        </div>

        <div>
          <h2 className={styles.label}>
            Description
            {errors.description && (
              <p className={styles.label_error}>{errors.description}</p>
            )}
          </h2>
          <textarea
            className={styles.input}
            type="text"
            value={input.description}
            name="description"
            onChange={(event) => handleChange(event)}
            rows="10"
            cols="50"
          />
        </div>

        <div className={styles.rating_released_box}>
          <div>
            <h2 className={styles.labelrr}>
              Released
              {errors.released && (
                <p className={styles.label_error}>{errors.released}</p>
              )}
            </h2>
            <input
              className={styles.input}
              type="date"
              value={input.released}
              name="released"
              min="1958-10-01"
              max="2030-12-31"
              onChange={(event) => handleChange(event)}
            />
          </div>

          <div>
            <h2 className={styles.labelrr}>
              Rating
              {errors.rating && (
                <p className={styles.label_error}>{errors.rating}</p>
              )}
            </h2>
            <input
              className={styles.input}
              type="number"
              value={input.rating}
              name="rating"
              min="0"
              max="5"
              step="0.01"
              onChange={(event) => handleChange(event)}
            />
          </div>
        </div>

        <div>
          <h2 className={styles.label}>
            Platforms
            {errors.platforms && (
              <p className={styles.label_error}>{errors.platforms}</p>
            )}
          </h2>
          <select
            className={styles.input}
            onChange={(event) => {
              handlePlatformSelect(event);
            }}
          >
            {platforms.map((platform) => (
              <option value={platform.name}>{platform.name}</option>
            ))}
          </select>
          <ul className={styles.pg_buttons}>
            {input.platforms.map((platform) => (
              <li>
                <div className={styles.button_pg}>
                  {platform}
                  <button
                    className={styles.button_pg_x}
                    type="button"
                    onClick={() => handlePlatformDelete(platform)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.label}>
            Genres
            {errors.genres && (
              <p className={styles.label_error}>{errors.genres}</p>
            )}
          </h2>
          <select
            className={styles.input}
            onChange={(event) => {
              handleGenreSelect(event);
            }}
          >
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
          <ul className={styles.pg_buttons}>
            {input.genres.map((genre) => (
              <li>
                <div className={styles.button_pg}>
                  {genre}
                  <button
                    className={styles.button_pg_x}
                    type="button"
                    onClick={() => handleGenreDelete(genre)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {errors &&
        (errors.name ||
          errors.background_image ||
          errors.description ||
          errors.released ||
          errors.rating ||
          errors.genres ||
          errors.platforms) ? (
          <p className={styles.label_error_form}>
            Please fill in all the fields correctly!
          </p>
        ) : (
          <div>
            <button type="submit" className={styles.savebutton}>
              SAVE GAME
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
