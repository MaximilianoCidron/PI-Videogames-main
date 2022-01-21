import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";
import LandingBackground from "../../assets/LandingBackground.gif";
import StartLanding from "../../assets/StartLanding.gif";
import PressStart from "../../assets/PressStart.png";

export default function Landing() {
  return (
    <div className={styles.landing}>
      <img
        className={styles.landing}
        src={LandingBackground}
        alt="LangindBackground"
      />
      <Link to="/home">
        <button className={styles.btn_home}>
          <img
            src={StartLanding}
            alt="StartButton"
            width="185px"
            height="90px"
          />
        </button>
      </Link>
      <div>
        <img className={styles.pressstart} src={PressStart} alt="PressStart" width="600px" height="200px" />
      </div>
    </div>
  );
}
