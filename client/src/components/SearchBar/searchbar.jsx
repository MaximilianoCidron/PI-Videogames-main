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

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getGamesByName(name));
    setName("");
    history.push("/home");
  };

  return (
    <div className={styles.searchbar}>
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
