import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName } from "../../redux/actions/index.js";
import styles from "./searchbar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getGamesByName(name));
  };

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
      <button
        type="submit"
        onClick={(event) => {
          handleSubmit(event);
        }}
      >
        Buscar
      </button>
    </div>
  );
}
