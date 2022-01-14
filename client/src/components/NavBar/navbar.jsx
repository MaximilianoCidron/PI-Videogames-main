import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchbar.jsx";
// import LandingLogo from "../../assets/LandingLogo.jpg";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/home">
          <img src="x" alt="logo.jpg" />
        </Link>
      </div>
      <div className={styles.links}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
        <Link to="/videogame" className={styles.link}>
          Add new Videogame
        </Link>
        <Link to="/about" className={styles.link}>
          About
        </Link>
      </div>
      <SearchBar />
    </div>
  );
}
