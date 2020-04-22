import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const TripReview = props => {
  const handleChange = event => {
    props.updateTitle(event.target.value);
  };

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
      difficulty,
      elevations,
      elevation_gain,
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
        difficulty,
        elevations,
        elevation_gain,
        coordinates,
        uuid,
        waypoints
      })
      .then(response => {
        console.log(response);
        props.history.push("/profile");
      });
  };
  const {
    title,
    origin_name,
    destination_name,
    distance,
    duration,
    elevation_gain
  } = props.tripData;

  return (
    <div>
      <form className="review-trip" onSubmit={handleSubmit}>
        <h2>Review your trip</h2>
        <div className="vertical-space"></div>
        <p className="caption-strong">Trip Name:</p>

        <input
          className="input-text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="Name your trip"
        />
        <div className="divider"></div>
        <div>
          <p className="caption-strong">Origin:</p>
          <p>{origin_name}</p>
          <br />
          <p className="caption-strong">Destination:</p>
          <p>{destination_name}</p>
          <br />
          <div className="review-trip-attributes">
            <div>
              <p className="caption-strong">Duration:</p>
              <p>{(duration / 60).toFixed(2)} hours</p>
            </div>
            <div>
              <p className="caption-strong">Distance:</p>
              <p>{distance.toFixed(2)} km</p>
            </div>
            <div>
              <p className="caption-strong">Elevation gain:</p>
              <p>{elevation_gain} m</p>
            </div>
          </div>
          <br />
          <button className="button-solid">Save this trip</button>
        </div>
      </form>
    </div>
  );
};
export default withRouter(TripReview);
