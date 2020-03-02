import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="main">
          <h1>
            Welcome to <span>Sykkel</span>
          </h1>
          <div className="intro">
            <p>
              Plan your next bike trip with ease. Discover trips from other
              cyclists, explore your area en route, and save your trips to your
              profile.
            </p>
            <p>What would you like to do?</p>
          </div>
          <div className="home-btns-wrapper">
            <Link to="/plotview">
              <button className="home-btn">Plan a new Trip</button>
            </Link>
            <Link to="/trips">
              <button className="home-btn">Explore existing Trips</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
