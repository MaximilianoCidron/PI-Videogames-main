import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchbar.jsx";
// import LandingLogo from "../../assets/LandingLogo.jpg";
//import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <div>
        <Link to="/home">
          <img src="x" alt="logo.jpg" />
        </Link>
      </div>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/videogame">+ Videogame</Link>
        <Link to="/about">About</Link>
      </div>
      {/* <SearchBar /> */}
    </div>
  );
}
