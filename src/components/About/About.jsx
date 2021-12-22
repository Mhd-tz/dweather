import React from "react";
import "./about.scss";

function About({ aboutOpen, setAboutOpen, isActive, setActive }) {
  return (
    <div className={"about " + (aboutOpen && "active")}>
      <div className="about-content">
        <h1>About</h1>
        <p>
          This is a simple weather app that uses the AccuWeather API to get
          weather data.
        </p>
        <p>The app is built using React, Redux, React Router, and Bootstrap.</p>
        <h2>Credits</h2>
        <p>The weather data is provided by the AccuWeather API.</p>
        <p>The weather icons are provided by the AccuWeather API.</p>
      </div>
      <div
        className="about-close"
        onClick={() => setAboutOpen(!aboutOpen) || setActive(!isActive)}
      >
        <i className="fa fa-times"></i>
      </div>
      <div className="about-developer">
        &copy; 2021 -
        <a
          href="https://linkedin.com/in/mahdi-taziki"
          target="_blank"
          rel="noopener noreferrer"
          className="about-developer-link"
        >
          Mahdi Taziki
        </a>
      </div>
    </div>
  );
}

export default About;
