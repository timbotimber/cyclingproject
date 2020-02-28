import React, { Component } from "react";
import TripCard from "./TripCard";

export default class Trips extends Component {
  render() {
    return (
      <div className="wrapper">
        <TripCard />
      </div>
    );
  }
}
