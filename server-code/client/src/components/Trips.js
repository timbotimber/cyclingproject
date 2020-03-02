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
      console.log('test id', trip._id);
      console.log('duration', trip.duration);
      return (
        <>
          <div key={index} className="wrapper">
            <TripCard trips={this.state.trips} title={trip.title} duration={trip.duration} myid={trip._id} />
          </div>
        </>
      );
    });
  }
}
