import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGamesByName } from "../../redux/actions/index.js";
import styles from "./searchbar.module.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(getGamesByName(name))
      .then((response) => {
        !response ? setError(true) : setError(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    setName("");
    history.push("/home");
  };

  return (
    <div className={styles.searchbar}>
      {error ? <div>{alert("Game not Found")}</div> : null}
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
      <button
        className={styles.button}
        type="submit"
        onClick={(event) => {
          handleSubmit(event);
        }}
      >
        <FaSearch />
      </button>
    </div>
  );
}
