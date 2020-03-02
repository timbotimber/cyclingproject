import React from 'react';

export default class TripCard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="trip-card">
          <div className="primary-content">
            <h2>{this.props.title}</h2>
            <p>Mostly flat, and lots of worth-visiting cities along the way.</p>
            <p>Duration: {this.props.duration}</p>
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
              <p className="caption">Elevation gain</p>
              <p className="attribute">883 m</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
