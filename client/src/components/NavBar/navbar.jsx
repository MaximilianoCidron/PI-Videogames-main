import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchbar.jsx";
import styles from "./navbar.module.css";
import { MdOutlineGamepad } from "react-icons/md";
import { IoGameController } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbar2}>
          <Link to="/home">
            Ho<IoGameController className={styles.logo} />e
          </Link>
        </div>
        <div className={styles.searchbar}>
          <SearchBar />
        </div>
        <div className={styles.navbar}>
          <Link to="/videogame">Add<MdOutlineGamepad className={styles.logo}/>Game</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </div>
  );
}
