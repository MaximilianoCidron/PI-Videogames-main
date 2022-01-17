import React from "react";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <h1>Henry-Videogames</h1>
        <p>
          This project was created as part of my fullstack developer education
          at{" "}
          <a
            className={styles.href_henry}
            href="https://www.soyhenry.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Henry bootcamp
          </a>
          . In order to map all the different videogames, this app consumes data
          from{" "}
          <a
            className={styles.href_games}
            href="https://rawg.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            the Videogames API
          </a>
          . The user can create a new videogames, filter by platform or genre
          and order by name or rating. Future projects will include creating a
          login system and a user profile, so that users can save their favorite
          videogames and make guides for them that they can share with others.
        </p>
        <p>
          Any feedback provided will be greatly appreciated. I hope you enjoy
          the app!
        </p>
      </div>
      <h1 className={styles.tech_title}>Used technologies:</h1>
      <div className={styles.tech_container}>
        <div className={styles.javascript}>
          <img
            className={styles.img_javascript}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
            alt=""
          />
          <h1 className={styles.text_javascript}>Javascript</h1>
        </div>
        <div className={styles.html}>
          <img
            className={styles.img_html}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
            alt=""
          />
          <h1 className={styles.text_html}>HTML</h1>
        </div>
        <div className={styles.css}>
          <img
            className={styles.img_css}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"
            alt=""
          />
          <h1 className={styles.text_css}>CSS</h1>
        </div>
        <div className={styles.react}>
          <img
            className={styles.img_react}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
            alt=""
          />
          <h1 className={styles.text_react}>React</h1>
        </div>
        <div className={styles.redux}>
          <img
            className={styles.img_redux}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg"
            alt=""
          />
          <h1 className={styles.text_redux}>Redux</h1>
        </div>
        <div className={styles.express}>
          <img
            className={styles.img_express}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg"
            alt=""
          />
          <h1 className={styles.text_express}>Express</h1>
        </div>
        <div className={styles.PostgreSQL}>
          <img
            className={styles.img_PostgreSQL}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"
            alt=""
          />
          <h1 className={styles.text_PostgreSQL}>PostgreSQL</h1>
        </div>
      </div>
    </div>
  );
}
