import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";
import LandingBackground from "../../assets/LandingBackground.gif";

export default function Landing() {
  return (
    <div className="landing">
      <img
        className={styles.landing}
        src={LandingBackground}
        alt="LangindBackground"
      />
      <Link to="/home">
        <button className={styles.btn_home}>Game On!</button>
      </Link>
    </div>
  );
}
