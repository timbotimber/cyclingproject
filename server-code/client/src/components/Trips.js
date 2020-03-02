import React, { Component } from 'react';
import TripCard from './TripCard';
import axios from 'axios';

export default class Trips extends Component {
  state = {
    trips: [],
  };

  componentDidMount() {
    this.getData();
    console.log(this.state.trips);
  }

  getData = () => {
    // console.log("getData()");
    axios.get('/api/trips/addTrip').then(response => {
      this.setState({
        trips: response.data,
      });
      console.log('state', this.state);
    });
  };

  render() {
    return this.state.trips.map((trip, index) => {
      return (
        <>
          {/* <div key={index}>
            <p>Trip Title: {trip.title}</p>
            <p>Trip Distance: {trip.distance ? trip.distance.toFixed(3) : 'No distance'} km</p>
            <p>Trip Duration: {trip.duration.toFixed(3)}</p>
          </div> */}
          <div key={index} className="wrapper">
            <TripCard trips={this.state.trips} title={trip.title} duration={trip.duration} />
          </div>
        </>
      );
    });
  }
}
