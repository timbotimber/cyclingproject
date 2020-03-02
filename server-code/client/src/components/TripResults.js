import React, { Component } from 'react';
import axios from 'axios';

export default class TripResults extends React.Component {
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

  // return trips.map((trip, index) => {
  //   return (
  //     <div key={index}>
  //       <p>{trip.duration}</p>;
  //     </div>
  //   );
  // });

  render() {
    return this.state.trips.map((trip, index) => {
      return (
        <div key={index}>
          <p>Trip Title: {trip.title}</p>
          <p>Trip Distance: {trip.distance ? trip.distance.toFixed(3) : 'No distance'} km</p>
          <p>Trip Duration: {trip.duration.toFixed(3)}</p>
        </div>
      );
    });
  }
}
