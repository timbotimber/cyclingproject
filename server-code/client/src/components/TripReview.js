import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Component } from "react";

class TripReview extends React.Component {
  state = {
    title: "",
    redirect: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  //   handleSubmit = event => {
  //     event.preventDefault();

  //     // send to api
  //     // response from api
  //     // change state.redirect to true
  //   };

  handleSubmit = event => {
    event.preventDefault();
    const {
      origin,
      destination,
      lng,
      lat,
      zoom,
      distance,
      duration,
      coordinates,
      uuid,
      waypoints
    } = this.state;
    // const id = this.state.match.params.
    axios
      .post("/api/trips/addTrip", {
        origin,
        destination,
        lng,
        lat,
        zoom,
        distance,
        duration,
        coordinates,
        uuid,
        waypoints
      })
      .then(response => {
        console.log(response);
      });
  };

  render() {
    console.log("trip data here:", this.props.tripData);

    const {
      title,
      origin,
      destination,
      lng,
      lat,
      zoom,
      distance,
      duration,
      coordinates,
      uuid,
      waypoints
    } = this.props.tripData;
    // if this.state.redirect --> return <Redirect to="/profile" />
    return (
      <div>
        <form className="review-trip" onSubmit={this.handleSubmit}>
          <h1>Review your trip</h1>
          <label htmlFor="title">Trip name</label>
          <input
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            placeholder="Name your trip"
          />
          <div>
            <p>Origin: {origin}</p>
            <p>Destination: {destination}</p>
            <p>Duration: {duration}</p>
            <p>Distance: {distance}</p>
            <button>Save this trip</button>
          </div>
        </form>
      </div>
    );
  }
}

export default TripReview;
