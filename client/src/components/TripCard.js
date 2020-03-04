import React from "react";
import { Link } from "react-router-dom";

export default class TripCard extends React.Component {
  render() {
    console.log("these are our props", this.props.trips);

    return (
      <div className="trips-list">
        {this.props.trips.map(trip => {
          return (
            <div className="trip-card">
              <div className="primary-content">
                <h2>
                  <Link to={`/trip/${trip._id}`}>{trip.title}</Link>
                </h2>
                <p>From: {trip.origin_name}</p>
                <p>To: {trip.destination_name}</p>
                {/* <p>Duration: {(this.props.duration / 60).toFixed(2)} hours</p> */}
              </div>

              <div className="secondary-content">
                <div>
                  <p className="caption">Difficulty</p>
                  <p className="attribute">
                    {trip.difficulty ? trip.difficulty : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="caption">Distance</p>
                  <p className="attribute">{trip.distance.toFixed(2)} km</p>
                </div>

                <div>
                  <p className="caption">Duration</p>
                  <p className="attribute">
                    {(trip.duration / 60).toFixed(2)} hrs
                  </p>
                </div>

                <div>
                  <p className="caption">Elevation gain</p>
                  <p className="attribute">
                    {Math.floor(Math.random() * (400 - 20) + 20)}m
                  </p>
                </div>
                <div>
                  <p className="caption">favourite this trip</p>
                  <p className="attribute">
                    <button>click to favourite</button>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
