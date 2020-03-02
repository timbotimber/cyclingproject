import React from "react";

export default class TripCard extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.trips.map(trip => {
          return (
            <div className="trip-card">
              <div className="primary-content">
                <h2>{trip.title}</h2>
                <p>Origin: {trip.origin_name}</p>
                <p>Destination: {trip.destination_name}</p>
                {/* <p>Duration: {(this.props.duration / 60).toFixed(2)} hours</p> */}
              </div>

              <div className="secondary-content">
                <div>
                  <p className="caption">Difficulty</p>
                  <p className="attribute">Intermediate</p>
                </div>

                <div>
                  <p className="caption">Distance</p>
                  <p className="attribute">150.16 km</p>
                </div>

                <div>
                  <p className="caption">Duration (hrs)</p>
                  <p className="attribute">
                    {(trip.duration / 60).toFixed(2)} hours
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
