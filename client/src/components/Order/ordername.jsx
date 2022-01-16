import React from "react";
import { useDispatch } from "react-redux";
import { orderByName } from "../../redux/actions/index.js";
import styles from "./order.module.css";

export default function OrderByName() {
  const dispatch = useDispatch();

  const handleOrderByName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
  };

  return (
    <div className={styles.filter}>
      <span>Order: </span>
      <select onChange={(event) => handleOrderByName(event)}>
        <option default value="-">
          -
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
  );
}
