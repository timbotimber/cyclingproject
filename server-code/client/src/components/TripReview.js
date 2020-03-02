import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Component } from "react";

const TripReview = props => {
  const handleChange = event => {
    props.updateTitle(event.target.value);
  };

  //   handleSubmit = event => {
  //     event.preventDefault();

  //     // send to api
  //     // response from api
  //     // change state.redirect to true
  //   };

  // console.log('trip data here:', this.props.tripData);

  const handleSubmit = event => {
    event.preventDefault();

    const {
      title,
      origin,
      origin_name,
      destination,
      destination_name,
      lng,
      lat,
      zoom,
      distance,
      duration,
      coordinates,
      uuid,
      waypoints
    } = props.tripData;

    // const id = this.state.match.params.
    axios
      .post("/api/trips/addTrip", {
        title,
        origin,
        origin_name,
        destination,
        destination_name,
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

  const {
    title,
    origin,
    origin_name,
    destination,
    destination_name,
    lng,
    lat,
    zoom,
    distance,
    duration,
    coordinates,
    uuid,
    waypoints
  } = props.tripData;

  // if this.state.redirect --> return <Redirect to="/profile" />

  return (
    <div>
      <form className="review-trip" onSubmit={handleSubmit}>
        <h1>Review your trip</h1>
        <label htmlFor="title">Trip name</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="Name your trip"
        />
        <div>
          <p>Origin: {origin_name}</p>
          <p>Destination: {destination_name}</p>
          <p>Duration: {(duration / 60).toFixed(2)} hours</p>
          <p>Distance: {distance.toFixed(2)} km</p>
          {/* <p>Waypoints: {waypoints}</p> */}
          <button>Save this trip</button>
        </div>
      </form>
    </div>
  );
};

export default TripReview;
