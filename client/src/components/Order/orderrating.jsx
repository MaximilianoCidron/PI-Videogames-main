import React from "react";
import { useDispatch } from "react-redux";
import { orderByRating } from "../../redux/actions/index.js";
import styles from "./order.module.css";

export default function OrderByRating() {
  const dispatch = useDispatch();

  const handleOrderByRating = (event) => {
    event.preventDefault();
    dispatch(orderByRating(event.target.value));
  };

  return (
    <div className={styles.filter}>
      <span>Rating: </span>
      <select
        className={styles.select_input}
        onChange={(event) => handleOrderByRating(event)}
      >
        <option default value="-">
          -
        </option>
        <option value="High">Highest</option>
        <option value="Low">Lowest</option>
      </select>
    </div>
  );
}
