import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";
import LandingBackground from "../../assets/LandingBackground.gif";
import StartLanding from "../../assets/StartLanding.gif";

export default function Landing() {
  return (
    <div className="landing">
      <img
        className={styles.landing}
        src={LandingBackground}
        alt="LangindBackground"
      />
      <Link to="/home">
        <button className={styles.btn_home}>
          <img
            className={styles.bbtn_home}
            src={StartLanding}
            alt="StartButton"
            width="185px"
            height="90px"
          />
        </button>
      </Link>
    </div>
  );
}
