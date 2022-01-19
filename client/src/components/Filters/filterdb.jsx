import React from "react";
import { useDispatch } from "react-redux";
import { filterDB } from "../../redux/actions/index.js";
import styles from "./filter.module.css";

export default function FilterDb() {
  const dispatch = useDispatch();

  const handleFilterDb = (event) => {
    event.preventDefault();
    dispatch(filterDB(event.target.value));
  };

  return (
    <div className={styles.filter}>
      <span>From: </span>
      <select className={styles.select_input} onChange={(event) => handleFilterDb(event)}>
        <option default value="All">
          All
        </option>
        <option value="Created">Data Base</option>
        <option value="API">API</option>
      </select>
    </div>
  );
}
