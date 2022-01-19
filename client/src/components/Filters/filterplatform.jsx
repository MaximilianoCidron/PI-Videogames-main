import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlatforms, filterByPlatform } from "../../redux/actions/index.js";
import styles from "./filter.module.css";

export default function FilterPlatform() {
  const dispatch = useDispatch();

  const platforms = useSelector((state) => state.platforms);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  const handleFilterPlatform = (event) => {
    event.preventDefault();
    dispatch(filterByPlatform(event.target.value));
  };

  return (
    <div className={styles.filter}>
      <span>Platform: </span>
      <select
        className={styles.select_input}
        onChange={(event) => handleFilterPlatform(event)}
      >
        <option default value="All">
          All
        </option>
        {platforms?.map((platform) => {
          return (
            <option key={platform.name} value={platform.name}>
              {platform.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
