import React from "react";
import styles from "./paginate.module.css";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers?.map((number) => (
          <div key={number} className={styles.number}>
            <button
              className={styles.button_page}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </div>
        ))}
      </ul>
    </nav>
  );
}
