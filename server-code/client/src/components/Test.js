import React, { Component } from 'react';
import axios from 'axios';

export default class Test extends React.Component {
  state = {
    trips: [],
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // console.log("getData()");
    axios.get('/addTrip').then(response => {
      this.setState({
        trips: response.data,
      });
      console.log('state', this.state);
    });
  };

  displayTrips = trips => {
    return trips.map((trip, index) => {
      <div key={index}>
        <p>{trip.duration}</p>
      </div>;
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.displayTrips}>Click Me Please</button>
        <p>{this.state.trips}</p>
      </div>
    );
  }
}
