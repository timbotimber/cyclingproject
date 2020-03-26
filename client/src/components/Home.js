import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-left">
        <div className="main">
          <h1>Cycling.</h1>
          <h1>Really far.</h1>
          <p className="intro-description">
            Introducing Sykkel. A social platform for cyclists to discover and plan long-distance cycling trips in and
            around Europe.
          </p>
          <div className="home-btns-wrapper">
            <Link to="/trips">
              <button className="button-solid-dark">Explore routes</button>
            </Link>
            <Link to="/plotview">
              <button className="button-solid">Plan your own</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-right">
        <img src="/img/home-teaser.png" alt="home-teaser" />
      </div>
    </div>
  );
};

export default Home;
