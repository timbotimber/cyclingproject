import React from 'react';
import { Link } from 'react-router-dom';

export default class TripCard extends React.Component {
  render() {
    console.log('these are our props', this.props.trips);

    return (
      <React.Fragment>
        <div className="trip-card">
          <div className="primary-content">
            <h2>{this.props.title}</h2>
            <p>Mostly flat, and lots of worth-visiting cities along the way.</p>
            <p>Duration: {this.props.duration}</p>
            <p>Id: {this.props.myid}</p>
            <b>
              <Link to={`/trip/${this.props.myid}`}> {this.props.title} </Link>
            </b>
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
