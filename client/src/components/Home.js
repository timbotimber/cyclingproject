import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="main">
          <h1>
            <span>Sykkel</span>
          </h1>
          <div className="intro">
            <p>Cycling. Really far.</p>
            <p>What would you like to do?</p>
          </div>
          <div className="home-btns-wrapper">
            <Link to="/plotview">
              <button className="home-btn">Plan a new Trip</button>
            </Link>
            <Link to="/trips">
              <button className="home-btn">Explore saved Trips</button>
            </Link>
          </div>
        </div>
        <div className="mainphone">
          <img
            className="phone"
            src="https://github.com/timbotimber/cyclingproject/blob/master/client/public/img/mobile_first.001.png?raw=true"
            alt="phone"
          />
        </div>
      </div>
    );
  }
}
